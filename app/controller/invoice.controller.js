const { Invoice } = require('../../models');
const { success, error } = require('../utils/responseUtil');

//********************************************************************************************
//*[START] Invoice Controller ******************************************
//*Description:
//*For Invoice Controller
//*
//************************************
// Function Name: func_getAllInvoice
// Description: get all invoice data
// Inputs & Arguments (required): req, res
// Type: Object, Object
// Outputs: 
//************************************
// Function Name: func_getInvoiceById
// Description: get invoice data by id
// Inputs & Arguments (required): id
// Type: integer
// Outputs: data
//************************************
// Function Name: func_createInvoice
// Description: create invoice
// Inputs & Arguments (required): data
// Type: object
// Outputs: message
//************************************
// Function Name: func_updateInvoice
// Description: update invoice by id
// Inputs & Arguments (required): id, data
// Type: integer, object
// Outputs: message
//************************************
// Function Name: func_deleteInvoice
// Description: delete invoice by id
// Inputs & Arguments (required): id
// Type: integer
// Outputs: message
//************************************
//*Errors Thrown:
//*If there is and error you will get error message with 500 or 404
//*
//************************************
//*Dependencies and libs:
//*[ Models, responseUtil ] 
//************************************
//*Notes:
//*Not applicable

exports.func_getAllInvoice = async (req, res) => {
  try {
    const { rows, count } = await Invoice.findAndCountAll();

    //************************************************************************
    // If can't find invoice data, respond with error
    if (count === 0) {
      return res.status(400).json(error('There is no Invoices', res.statusCode));
    }

    return res.status(200).json(success("OK", { data: rows, count: count }, res.statusCode));

  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

exports.func_getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findOne({ where: { id } });

    //************************************************************************
    // If can't find invoice data by id, respond with error
    if (!invoice) {
      return res.status(400).json(error(`There is no Invoices by id = ${id} `, res.statusCode));
    }

    return res.status(200).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

exports.func_createInvoice = async (req, res) => {
  try {
    const { date, customer_name, sales_person_name, notes, products } = req.body;

    const invoice = await Invoice.create({
      date,
      customer_name,
      sales_person_name,
      notes,
      products
    });

    return res.status(200).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

exports.func_updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, customer_name, sales_person_name, notes, products } = req.body;

    //************************************************************************
    // before update search
    const existInvoice = await Invoice.findOne({ where: { id } });

    //************************************************************************
    // If can't find invoice data by id, respond with error
    if (!existInvoice) {
      return res.status(400).json(error(`There is no Invoices by id = ${id} `, res.statusCode));
    }

    //************************************************************************
    // update process
    await Invoice.update({
      date,
      customer_name,
      sales_person_name,
      notes,
      products
    }, {
      where: { id }
    });

    //************************************************************************
    // after update search
    const invoice = await Invoice.findOne({ where: { id } });

    return res.status(200).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

exports.func_deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    //************************************************************************
    // before delete search
    const existInvoice = await Invoice.findOne({ where: { id } });

    //************************************************************************
    // If can't find invoice data by id, respond with error
    if (!existInvoice) {
      return res.status(400).json(error(`There is no Invoices by id = ${id} `, res.statusCode));
    }

    await Invoice.destroy({ where: { id } });

    return res.status(200).json(success("OK", { data: '' }, res.statusCode));
  } catch (err) {
    return res.status(500).json(error(err.message, res.statusCode));
  }
}

//*[END] Invoice Controller ********************************************
//********************************************************************************************