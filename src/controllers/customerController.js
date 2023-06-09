const { createCustomerAPI, createArrCustomersAPI } = require('../services/customerService')
const { uploadSingleFile, uploadMultiFiles } = require('../services/filesService')

module.exports = {
    postCustomerAPI: async (req, res) => {
        let { email, address, phone, name, description } = req.body;

        let imageURL = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            //do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageURL = result.path;
        };

        let customerData = {
            email,
            address,
            phone, name,
            description,
            image: imageURL
        }

        let customer = await createCustomerAPI(customerData);

        return res.status(200).json({
            errCode: 0,
            data: customer
        })

    },

    postArrCustomersAPI: async (req, res) => {

        let customers = await createArrCustomersAPI(req.body.customers);
        if (customers) {
            return res.status(200).json({
                errCode: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                errCode: -1,
                data: customers
            })
        }

    },
}
