import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {AlertController} from "ionic-angular";
import {QuotesService} from '../../services/quotes';
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{
  quotegroup: {category: string, quotes: Quote[], icon: string};
  constructor(private navParams: NavParams, private alertCtrl: AlertController, private quotesService: QuotesService){}

  // ionViewDidLoad() {
  //   this.quotegroup = this.navParams.data; //add elvis operator (?) to use this approach
  // }
  ngOnInit(){
    this.quotegroup = this.navParams.data;
  }
  onAddToFavorites(selectedQuote: Quote){
    const alert=this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      buttons: [{
        text: 'Yes, go ahead',
        handler: () => {
          this.quotesService.addQuoteToFavorites(selectedQuote);
        }
      },
      {
        text: 'No, I cahnged my mind',
        role: 'cancel',
        handler: () => {
          console.log('canceled');
        }
      }
    ]
    });
    alert.present();
}
  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }
  isFavorite(quote: Quote){
    return this.quotesService.isQuoteFavorite(quote);
  }
}