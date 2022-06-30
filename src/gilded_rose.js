class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


// Goals: 
  // Simplify existing code to a more readable format
  // Configure double degradation after saleBy date has passed

  // Set names into components to prevent duplicate typing and potential typos
  const aged_Brie = 'Aged Brie'
  const backstage_Pass = 'Backstage passes to a TAFKAL80ETC concert'
  const sulfuras = 'Sulfuras, Hand of Ragnaros'
  const cake = 'Conjured Mana Cake'

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != aged_Brie && this.items[i].name != backstage_Pass) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != sulfuras) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == backstage_Pass) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != sulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != aged_Brie) {
          if (this.items[i].name != backstage_Pass) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != sulfuras) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  // handle sellInDecrease deduct days by 1
  sellInDecrease(i) {

    // check to make sure item name is not sulfuras if its not then - 1 
    this.items[i].name != sulfuras ? this.items[i].sellIn = this.items[i].sellIn -1 : null
  }

  // handle qualityDecrease by 1
  qualityDecrease(i) {

    // if quality is > 0 and item isnt sulfuras -1 from quality. 
    this.items[i].quality > 0 && this.items[i].name != sulfuras ? this.items[i].quality = this.items[i].quality -1 :null

    // if quality > 0 and the item is not cake -1 from quality
    this.items[i].quality > 0 && this.items[i].name != cake ? this.items[i].quality = this.items[i].quality -1 : null
  }

  // handle quality increase by 1
  qualityIncrease(i) {
    // check if item qulaity is < 50 then add 1
    if(this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality +1
      
      // check if name is backstage_Pass and the days are < 11 if so add another to quality. If days drop below 6 add another to quality 
      if(this.items[i].name == backstage_Pass && this.items[i].sellIn < 11) {
        this.items[i].quality = this.items[i].quality +1
      
        
        if(this.items[i].sellIn < 6 && this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality +1
        }

        // if sellIn days < 0 quality = 0
        if(this.items[i].sellIn < 0) {
          this.items[i].quality = 0
        }
      }
    }
  }

  // handle expired cases
  sellInExpiredQualityUpdate(i) {
    // check if name is not aged_Brie or sulfuras or backstage_Pass then deduct from quality
    if(this.items[i].name != aged_Brie || sulfuras || backstage_Pass && this.items[i].quality > 0) {
      this.items[i].quality = this.items[i].quality - 1
    } else {
      if( this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality +1
      }
    }
    if (this.items[i].quality < 0 ) {
      this.items[i].quality = 0
    }
  }
}

module.exports = {
  Item,
  Shop
}
