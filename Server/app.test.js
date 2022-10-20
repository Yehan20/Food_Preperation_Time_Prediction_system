const request=require('supertest')
const app= require('./controller/mealController')


describe('FTP Api',()=>{
    it('GET /meals --> array meals',()=>{
          return request(app)
          .get('/meals')
       
          .expect(200)
          .then((response)=>{
             expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                            name:expect.anyString(),
                            completed:expect.anyBoolean(),
                        }
                    ),
                ])
             )
          })

    })
    it('GET /meal/id --> specific meal by id',()=>{

    })
    it('POST /order/add --> create order',()=>{

    })
    it('GET /order/get --> order array',()=>{

    })
    it('GET /meal/id --> 404',()=>{
        return request(app)
        .get('/meals/999999').expect(404)
    })
})
