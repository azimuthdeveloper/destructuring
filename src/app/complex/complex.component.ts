import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  BehaviorSubject,
  combineLatestWith,
  delay,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  withLatestFrom
} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './complex.component.html',
  styleUrl: './complex.component.scss'
})
export class ComplexComponent implements OnInit {

  searchName = signal('');
  tableData$?: Observable<TestData[]>;

  ngOnInit(): void {

    this.tableData$ = this.sortOrder.pipe(
      combineLatestWith(this.header),
      combineLatestWith(this.searchButton$),
      withLatestFrom(this.formGroup.valueChanges),
      switchMap(([[[sort, header], _], formData]) => {
        return this.fakeAsyncronousDataSource(formData.name ?? '', formData.profession ?? '', header, sort, 0)
      }),
      startWith(testData.slice(0, 10))
    )
  }

  formData$?: Observable<PagedResult>;

  formGroup = new FormGroup({
    name: new FormControl<string>(''),
    profession: new FormControl<string>('')
  });

  sortOrder = new BehaviorSubject<SortOrder>(SortOrder.Ascending);
  header = new BehaviorSubject<Header | undefined>(Header.Name);
  searchButton$ = new Subject<void>();

  // nameSort = BehaviorSubject<SortOrder>(SortOrder.Ascending);

  search() {
    this.searchButton$.next();
  }

  sortName() {
    // debugger;
    this.sortOrder.next(this.sortOrder.value == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending);
  }

  fakeAsyncronousDataSource(name: string, profession: string, header: Header | undefined, sortOrder: SortOrder, page: number) {
    return of(
      testData
    ).pipe(delay(0),
      map(data => {
        debugger;
        // Filter the data by name and header
        let filteredData = data.filter(item =>
          ((!item.name) || (item.name.toLowerCase().indexOf(name.toLowerCase()) > -1)) &&
          ((!item.profession) || item.profession.toLowerCase().indexOf(profession.toLowerCase()) > -1)
        );
        debugger;
        // Sort the data based on the sortOrder
        if (sortOrder) {
          header ??= Header.Name;
          debugger;
          // header = header!;
          filteredData = filteredData.sort((a, b) => {
            if (a[header!] < b[header!]) {
              return sortOrder === SortOrder.Ascending ? -1 : 1;
            }
            if (a[header!] > b[header!]) {
              return sortOrder === SortOrder.Descending ? 1 : -1;
            }
            return 0;
          });
        }

        // Optionally, implement pagination if needed
        const pageSize = 10; // Adjust this to your needs
        const start = (page) * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
      }))
  }
}

export interface PagedResult {
  page: number,
  sortOrder: SortOrder,
  data: Array<TestData>
}

export interface TestData {
  name: string;
  profession: string;
  languages: Array<string>,
  available: boolean
}

export enum SortOrder {
  Ascending = 'ascending',
  Descending = 'descending'
}

export enum Header {
  Name = 'name',
  Profession = 'profession',
  Languages = 'languages',
  Available = 'available'
}

const testData = [
  {
    "name": "Alice Johnson",
    "profession": "Software Engineer",
    "languages": ["JavaScript", "Python", "C++"],
    "available": true
  },
  {
    "name": "Bob Smith",
    "profession": "Data Scientist",
    "languages": ["Python", "R", "SQL"],
    "available": false
  },
  {
    "name": "Catherine Lee",
    "profession": "Full Stack Developer",
    "languages": ["JavaScript", "TypeScript", "Ruby"],
    "available": true
  },
  {
    "name": "David Brown",
    "profession": "DevOps Engineer",
    "languages": ["Bash", "Python", "Go"],
    "available": false
  },
  {
    "name": "Evelyn Green",
    "profession": "Mobile App Developer",
    "languages": ["Kotlin", "Swift", "Dart"],
    "available": true
  },
  {
    "name": "Frank Harris",
    "profession": "Backend Developer",
    "languages": ["Java", "Scala", "Python"],
    "available": true
  },
  {
    "name": "Grace Wilson",
    "profession": "Frontend Developer",
    "languages": ["HTML", "CSS", "JavaScript"],
    "available": false
  },
  {
    "name": "Henry Adams",
    "profession": "Game Developer",
    "languages": ["C#", "C++", "Lua"],
    "available": true
  },
  {
    "name": "Ivy Carter",
    "profession": "UI/UX Designer",
    "languages": ["JavaScript", "TypeScript", "Figma"],
    "available": false
  },
  {
    "name": "Jack Morgan",
    "profession": "Machine Learning Engineer",
    "languages": ["Python", "TensorFlow", "C++"],
    "available": true
  },
  {
    "name": "Kara Miller",
    "profession": "Embedded Systems Developer",
    "languages": ["C", "C++", "Python"],
    "available": false
  },
  {
    "name": "Liam Anderson",
    "profession": "Cloud Architect",
    "languages": ["Go", "Python", "Java"],
    "available": true
  },
  {
    "name": "Mia Thompson",
    "profession": "Security Analyst",
    "languages": ["Python", "Bash", "C"],
    "available": true
  },
  {
    "name": "Nathan Hall",
    "profession": "Site Reliability Engineer",
    "languages": ["Python", "JavaScript", "Go"],
    "available": false
  },
  {
    "name": "Olivia White",
    "profession": "Blockchain Developer",
    "languages": ["Solidity", "JavaScript", "Rust"],
    "available": true
  },
  {
    "name": "Paul Martinez",
    "profession": "Systems Analyst",
    "languages": ["Python", "SQL", "Java"],
    "available": false
  },
  {
    "name": "Quinn Lewis",
    "profession": "Database Administrator",
    "languages": ["SQL", "Python", "PL/SQL"],
    "available": true
  },
  {
    "name": "Rachel Clark",
    "profession": "AI Researcher",
    "languages": ["Python", "C++", "Java"],
    "available": true
  },
  {
    "name": "Sam Rogers",
    "profession": "Technical Writer",
    "languages": ["Markdown", "HTML", "JavaScript"],
    "available": false
  },
  {
    "name": "Tina Martinez",
    "profession": "Hardware Engineer",
    "languages": ["C", "Verilog", "Assembly"],
    "available": true
  },
  {
    "name": "Umar Khan",
    "profession": "Robotics Engineer",
    "languages": ["C++", "Python", "ROS"],
    "available": false
  },
  {
    "name": "Victor Walker",
    "profession": "Network Engineer",
    "languages": ["Python", "Bash", "Perl"],
    "available": true
  },
  {
    "name": "Wendy Scott",
    "profession": "E-commerce Developer",
    "languages": ["PHP", "JavaScript", "SQL"],
    "available": true
  },
  {
    "name": "Xander Young",
    "profession": "Bioinformatics Specialist",
    "languages": ["Python", "R", "Perl"],
    "available": false
  },
  {
    "name": "Yara Baker",
    "profession": "IT Consultant",
    "languages": ["Python", "Java", "SQL"],
    "available": true
  },
  {
    "name": "Zane Perez",
    "profession": "Quality Assurance Tester",
    "languages": ["JavaScript", "Python", "Ruby"],
    "available": false
  }
] as Array<TestData>;
