class Item {
  constructor(name, sellIn, quality){
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
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
    this.items = items
  }
  updateQuality() {
    // Loop through the array of items in the shop
    for (let i = 0; i < this.items.length; i++) {
      // If item is not aged_Brie or backstage_Pass
      this.items[i].name != aged_Brie && this.items[i].name != backstage_Pass
      // Run qualityDecrease function If item is aged_Brie or backstage_Pass --> Run qualityIncrease function
      ? this.qualityDecrease(i) : this.qualityIncrease(i)

      // sellIn will always be decrease unless the name is sulfuras --> Run sellInDecrease function.
      this.sellInDecrease(i) 
      // If sellIn is less than 0 Run sellInExpiredQualityUpdate function Otherwise empty or undefined
      this.items[i].sellIn < 0 
      ? this.sellInExpiredQualityUpdate(i) : null
    }
    // Return the array of items in the shop
    return this.items
  }

  // handle sellInDecrease deduct days by 1
  sellInDecrease(i) {

    // check to make sure item name is not sulfuras if its not then - 1 
    this.items[i].name != sulfuras ? this.items[i].sellIn = this.items[i].sellIn - 1 : null
  }

  // handle qualityDecrease by 1
  qualityDecrease(i) {

    // if quality is > 0 and item isnt sulfuras -1 from quality. 
    this.items[i].quality > 0 && this.items[i].name != sulfuras ? this.items[i].quality = this.items[i].quality - 1 : null

    // if quality > 0 and the item is cake -1 from quality
    this.items[i].quality > 0 && this.items[i].name == cake ? this.items[i].quality = this.items[i].quality - 1 : null
  }

  // handle quality increase by 1
  qualityIncrease(i) {
    // check if item qulaity is < 50 then add 1
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1
      // check if name is backstage_Pass and the days are < 11 if so add another to quality. If days drop below 6 add another to quality
      if (this.items[i].name == backstage_Pass && this.items[i].sellIn < 11 && this.items[i].quality < 50) {
          // Add 1 to the quality of item
          this.items[i].quality = this.items[i].quality + 1
        }
        // If the sellIn day value is 5 or less AND quality is less than 50
        if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
          // Add 1 to quality
            this.items[i].quality = this.items[i].quality + 1
          }
        }
  }

  // handle expired cases
  sellInExpiredQualityUpdate(i) {
    // check if name is not aged_Brie or sulfuras or backstage_Pass then deduct from quality
    if (this.items[i].name != aged_Brie) {
      if (this.items[i].quality > 0 && this.items[i].name != sulfuras && this.items[i].name != backstage_Pass) {
          this.items[i].quality = this.items[i].quality - 1
      } else {
      // Holds quality from going negative or below 0
      this.items[i].quality = this.items[i].quality - this.items[i].quality
      }
    } else {
      // For 'Aged Brie' and 'Backstage passes,' quality increased until it gets to 50
      if (this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
