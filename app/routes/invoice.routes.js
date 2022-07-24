var router = require('express').Router();
const invoiceController = require('../controller/invoice.controller');

//********************************************************************************************
//*[START] For Invoice.Routes ******************************************

router.get('/', invoiceController.func_getAllInvoice);

router.get('/:id', invoiceController.func_getInvoiceById);

router.post('/', invoiceController.func_createInvoice);

router.put('/:id', invoiceController.func_updateInvoice);

router.delete('/:id', invoiceController.func_deleteInvoice);

module.exports = router;

//*[END] For Invoice.Routes ********************************************
//*************************************************************************************** *****