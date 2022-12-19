const request=require('supertest')
const app= require('./controller/mealController')
const meal= require('./routes/mealRoutes')




test('Fetch food',()=>{
    

    expect.assertions(0); //  
    return app.viewMeal()
    .then( data=>{
            expect(data.id).toEqual(60)
        }
    )
})
    it('GET /meal/id --> 404',()=>{
        return request(app)
        .get('/meals/999999').expect(404)
    })


