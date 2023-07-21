import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  inputKeyword:string='';
  constructor(private router:Router,
              private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.inputKeyword=params['keyword'];
      }
    )
  }

  doSearchKeyword(keyword:string){
    this.router.navigate(['/search',keyword]);
  }

}
