import axios from 'axios';

const url = "api/cars/";

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

    // Create Car
    static insertCar(make, model){
        return axios.post(url, {make, model});
    }

    // Delete Car
    static deleteCar(id){
        return axios.delete(`${url}${id}`);
    }
}

export default CarService;