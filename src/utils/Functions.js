const getEstimatedFare =  function (cat_id,Est_Fare_List) {
    // console.log(cat_id,"called",Est_Fare_List,Est_Fare_List[2])
    const fare = Est_Fare_List[cat_id]?.trip_pay_amount
    return fare ;
};


module.exports = {
    getEstimatedFare,
};