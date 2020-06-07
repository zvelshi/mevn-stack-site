import axios from 'axios';

const url = "/api/cars/";

class CarService {    
    // Get Cars
    static getCars() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(car => ({
                        ...car,
                        createdAt: new Date(car.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

    // Get Car by Id
    static getCarById(id){
        return new Promise ((resolve, reject) => {
            axios.get(`${url}${id}`).then((res) => {
                const data = res.data[0];
                resolve(
                    data,
                )})
                .catch((err)=> {
                    reject(err);
                })
        })
        
        
    }
    
    // Create Car
    static insertCar(year, make, model, bodytype, mileage, mileageunit, drivetrain, transmission, price, engineinfo, colour, description){
        return axios.post(url, {year, make, model, bodytype, mileage, mileageunit, drivetrain, transmission, price, engineinfo, colour, description});
    }

    // Delete Car
    static deleteCar(id){
        return axios.delete(`${url}${id}`);
    }
}

export default CarService; 