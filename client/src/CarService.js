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
        axios.get(`${url}${id}`).then(response => {
            return response.data[0];
        });
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