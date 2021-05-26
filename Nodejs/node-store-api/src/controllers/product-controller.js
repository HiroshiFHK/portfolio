'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        const data = repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'the title must contain at least three characters');
    contract.hasMinLen(req.body.slug, 3, 'the slug must contain at least three characters');
    contract.hasMinLen(req.body.description, 3, 'the description must contain at least three characters');

    //if contract invalid
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        //create blob service
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //save image
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function(error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        });

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestrhiroshi.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({
            message: 'Product successfully created!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Product successfully updated!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Product successfully deleted!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your requisition'
        });
    }
}