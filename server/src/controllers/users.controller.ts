import {Router} from 'express';
import {User} from '../models/user.model';
import {UserRole} from '../models/userRole.model';

export const users = Router();

users.post('/', async (req, res, next) => {
  try {
    const actor = await User.create(req.body);
    res.status(201).json(actor);
  } catch (e) {
    next(e);
  }
});

users.post('/:id/roles/:roleId', async (req, res, next) => {
  try {
    await UserRole.create({
      actorId: req.params['id'], roleId: req.params['roleId']
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

users.get('', async (req, res, next) => {
  try {
    req.query
    res.json(await User.scope(req.query['scope'] as any).findAll());
  } catch (e) {
    next(e);
  }
});

users.get('/:id', async (req, res, next) => {
  try {
    const actor = await User.scope(req.query['scope'] as any).findByPk(req.params['id']);
    res.json(actor);
  } catch (e) {
    next(e);
  }
});

users.put('/:id', async (req, res, next) => {
  try {
    await User.update(req.body, {where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});