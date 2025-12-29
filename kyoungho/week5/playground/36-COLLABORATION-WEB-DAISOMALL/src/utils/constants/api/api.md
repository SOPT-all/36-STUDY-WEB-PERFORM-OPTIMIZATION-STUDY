# .env
VITE_API_BASE_URL=https://43.201.98.17.nip.io/

# API 명세서

# brand-controller
## GET /api/v1/brands/{brandId}/products 브랜드별 상품 조회

Parameters:
brandId *required (integer)
request *required (object)
{
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "products": [
      {
        "productId": 0,
        "productName": "string",
        "price": 0,
        "tags": [
          "string"
        ]
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

# product-controller
## GET /api/v1/products/{productId} 
상품 상세 조회

Parameters:
productId *required (integer)

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "productId": 0,
    "productName": "string",
    "price": "string",
    "ratingAvg": "string",
    "reviewCount": "string",
    "brandName": "string",
    "productImages": {
      "main": [
        {
          "productImageId": 0,
          "imageUrl": "string",
          "sortOrder": 0
        }
      ],
      "detail": [
        {
          "productImageId": 0,
          "imageUrl": "string",
          "sortOrder": 0
        }
      ]
    }
  }
}

## GET /api/v1/products/search 
상품 검색 (상품명, 품번, 브랜드)

Parameters:
keyword *required (string)
request *required (object)
{
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "products": [
      {
        "productId": 0,
        "productName": "string",
        "productCode": "string",
        "price": 0
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

## GET /api/v1/products/search/{keyword}/sort 
상품 정렬 (최신, 가격 낮은 순, 높은 순)

Parameters:
keyword *required (string)
request *required (object)
{
  "sortOption": "string",
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "products": [
      {
        "productId": 0,
        "productName": "string",
        "productCode": "string",
        "price": 0
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

## GET /api/v1/products/popular 
지금 많이 찾는 상품 조회

no parameters

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "pages": [
      [
        {
          "productId": 0,
          "productName": "string",
          "productCode": "string",
          "price": 0
        }
      ]
    ],
    "total": 0
  }
}

# review-controller
## GET /api/v1/reviews
상품에 대한 전체 리뷰를 조회합니다

Parameters:
productId *required (integer)
request *required (object)
{
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "reviews": [
      {
        "reviewId": 0,
        "nickname": "string",
        "profileImageUrl": "string",
        "rating": 0,
        "content": "string",
        "images": [
          {
            "reviewImageId": 0,
            "imageUrl": "string",
            "isMain": true,
            "sortOrder": 0
          }
        ]
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

# store-controller
## GET /api/v1/stores 상품별 매장 재고 기본 조희

Parameters:
productId *required (integer)
request *required (object)
{
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "stores": [
      {
        "storeId": 0,
        "storeName": "string",
        "location": "string",
        "openingHours": "string",
        "latitude": 0,
        "longitude": 0,
        "isPickupAvailable": true,
        "floor": "string",
        "shelfNo": 0,
        "stockCount": 0,
        "stockStatus": "string"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

## GET /api/v1/stores/search
매장명으로 검색
```
특정 상품(productId)에 입고된 매장 목록을 매장 이름(keyword)으로 검색
-> productId: 조회할 상품의 고유 ID (필수)
+ keyword: 매장명에 포함된 키워드로 필터링 (선택)
+ pageNumber: 0부터 시작하는 페이지 번호 (필수)
+ pageSize: 한 페이지에 반환할 항목 수 (필수)
```

Parameters:
productId *required (integer) (query)
keyword *required (string) (query)
request *required (object) (query)
{
  "pageNumber": 0,
  "pageSize": 0
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "stores": [
      {
        "storeId": 0,
        "storeName": "string",
        "location": "string",
        "openingHours": "string",
        "storeType": "string",
        "stockCount": 0,
        "shelfNo": 0,
        "floor": "string"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}

## GET /api/v1/stores/filter 
상품별 매장 필터 조회

Parameters:
productId *required (integer) (query)
basicRequest *required (object) (query)
{
  "pageNumber": 0,
  "pageSize": 0
}
filterRequest *required (object) (query)
{
  "pickup": true,
  "excludeOutOfStock": true,
  "excludeStoreType": true
}

Responses:
200 (OK)
{
  "status": 0,
  "message": "string",
  "data": {
    "stores": [
      {
        "storeId": 0,
        "storeName": "string",
        "location": "string",
        "openingHours": "string",
        "latitude": 0,
        "longitude": 0,
        "isPickupAvailable": true,
        "floor": "string",
        "shelfNo": 0,
        "stockCount": 0,
        "stockStatus": "string"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 0,
      "numberOfElements": 0,
      "isLast": true
    }
  }
}