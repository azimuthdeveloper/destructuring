import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple',
  standalone: true,
  imports: [],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss'
})
export class SimpleComponent implements OnInit {

  simpleArray = [1, 2, 3, 4, 5];

  filteredArray = [] as Array<number>;

  ngOnInit(): void {

    const [a,b, _, z,x,c,q,w,...remainder] = this.simpleArray;





    // this.simpleArray = [a,b] = this.simpleArray;


  }


}
