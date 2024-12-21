module.exports = (products, item) => {
    let output = products.replace(/{ProductName}/g, item.productName);
    output = output.replace(/{ProductImg}/g, item.image);
    output = output.replace(/{ProductNutreints}/g, item.nutreints);
    output = output.replace(/{ProductQuant}/g, item.quantity);
    output = output.replace(/{ProductPrice}/g, item.price);
    output = output.replace(/{ProductDesc}/g, item.description);
    output = output.replace(/{ProdId}/g, item.id);
    output = output.replace(/{ProductFrom}/g, item.from);
  
    if (!item.organic) output = output.replace(/{nonOrganic}/g, "not-organic");
  
    return output;
  };