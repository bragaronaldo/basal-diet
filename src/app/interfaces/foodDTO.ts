  export interface FoodDTO {
    foods: [
      {
        food_name: string
        brand_name?: any
        serving_qty?: number
        serving_unit?: string
        serving_weight_grams?: number
        nf_calories?: number
        nf_total_fat?: number
        nf_saturated_fat?: number
        nf_cholesterol?: number
        nf_sodium?: number
        nf_total_carbohydrate?: number
        nf_dietary_fiber?: number
        nf_sugars?: number
        nf_protein?: number
        nf_potassium?: number
        nf_p?: number
        full_nutrients?: FullNutrient[]
        nix_brand_name?: any
        nix_brand_id?: any
        nix_item_name?: any
        nix_item_id?: any
        upc?: any
        consumed_at?: string
        metadata?: Metadata
        source?: number
        ndb_no?: number
        tags?: Tags
        alt_measures?: AltMeasure[]
        lat?: any
        lng?: any
        meal_type?: number
        photo: Photo
        sub_recipe?: any
        class_code?: any
        brick_code?: any
        tag_id?: any
        }
    ]
  }

  export interface FullNutrient {
    attr_id: number
    value: number
  }

  export interface Metadata {
    is_raw_food: boolean
  }

  export interface Tags {
    item: string
    measure: any
    quantity: string
    food_group: number
    tag_id: number
  }

  export interface AltMeasure {
    serving_weight: number
    measure: string
    seq?: number
    qty: number
  }

  export interface Photo {
    thumb: string
    highres: string
    is_user_uploaded: boolean
  }

