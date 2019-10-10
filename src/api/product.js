import {request} from '@/libs/request'
let productApi = {
    //????    
    productList(num,size){
        return request({
            url:"/v1/bid/business/productList",
            data:{
                num:num,
                size:size,
                productTypeList:["bid_type_novice","bid_type_produce"],
            }
        })
    },
    
}
export { productApi }
