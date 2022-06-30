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
}

module.exports = {
  Item,
  Shop
}
