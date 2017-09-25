import { SettingsService } from './../../services/settings';
import { QuotePage } from './../quote/quote';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService} from "../../services/quotes"
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    private quotesService: QuotesService, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) {
  }
  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }
  onViewQuote(quote: Quote){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
       this.onRemoveFromFavorites(quote);
      }   
    });
  }
onRemoveFromFavorites(quote){
  this.quotesService.removeQuoteFromFavorites(quote);
        // this.quotes = this.quotesService.getFavoriteQuotes();
        const position = this.quotes.findIndex((quoteEl: Quote) => {
          return quoteEl.id == quote.id;
        });
        this.quotes.splice(position, 1);
}
  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}
