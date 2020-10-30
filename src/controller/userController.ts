import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, badRequestError } from '../modules/common/service';
import { User, IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');
import ModificationNote from '../modules/common/model'
import { validate } from 'class-validator';

export class UserController {

    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.name &&
            req.body.email &&
            req.body.phone_number &&
            req.body.gender) {
            const user: IUser = {
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                modification_notes: [new ModificationNote({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New user created'
                })]
            };
            const user_params = new User(user);
            validate(user_params, { validationError: { target: false } }).then(errors => {
                if (errors.length > 0) {
                    badRequestError(errors, res);
                } else {
                    this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('create user successfull', user_data, res);
                        }
                    });
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user(req: Request, res: Response) {
        if (req.params.id &&
            req.body.name ||
            req.body.email ||
            req.body.phone_number ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User data updated'
                    });
                    const user: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_notes: user_data.modification_notes
                    };
                    const user_params = new User(user);
                    validate(user_params, { validationError: { target: false } }).then(errors => {
                        if (errors.length > 0) {
                            badRequestError(errors, res);
                        } else {
                            this.user_service.updateUser(user_params, (error: any) => {
                                if (error) {
                                    mongoError(error, res);
                                } else {
                                    successResponse('update user successfull', null, res);
                                }
                            });
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}