import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { exec } from 'child_process';
import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import ApiError from '../classes/ApiError.class.js';

import { fileURLToPath } from 'url';
import { parseISO, format } from 'date-fns';
import util from 'util';
import mercadopago from 'mercadopago';
import generateStrongKey from '../utils/generateStrongKey.js';

import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';
import pool from './conn.config.js';


const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

	
const secretKey: string = "secretKey";

// mercadopago.configure({
// 	access_token: 'TEST-5193570165554565-111913-33c96f9e183fcfc52d2b1e4292f97c8a-826294035'
// });



// router.use(express.static(path.join(__dirname, 'public')));
// router.use(flash());
// router.use((req, res, next) => {
// 	res.locals.sucess_msg = req.flash('sucess_msg');
// 	res.locals.error_msg = req.flash('error_msg');
// 	next();
// });

// class HTTPError extends Error {
// 	constructor(message, code) {
// 		super(message);
// 		this.code = code;
// 	}
// }
// interface Request extends RequestExpress {
// 	userId: number;
// }

export {
	// HTTPError,
	NextFunction,
	Request,
	Response,
	__dirname,
	bcrypt,
	crypto,
	express,
	format,
	mercadopago,
	fs,
	jwt,
	multer,
	parseISO,
	path,
	exec,
	util,
	pool,
	secretKey,
	ApiError
};
