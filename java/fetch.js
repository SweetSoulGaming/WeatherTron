class Fetch {
    async getCurrent(input) {
        const myKey ="b7d3075739023dd6b2d202156b52ee8b"
    
        //make request to url
       const response = await fetch(
           `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${myKey}`
       );

        const data = await response.json();

        console.log(data);

        return data;
    
    }
}