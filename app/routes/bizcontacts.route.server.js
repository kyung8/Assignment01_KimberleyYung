
import { Router } from "express";

import { DisplayBizContactsList,
    DisplayBizContactsEditPage,
    ProcessBizContactsEditPage,
    ProcessBizContactsDelete } from "../controllers/bizcontacts.controller.server.js";

import { AuthGuard } from "../routes/utils/index.js";

const router = Router();

router.get('/bizcontacts-list', AuthGuard, DisplayBizContactsList);
router.post('/bizcontacts-edit/:id', AuthGuard, ProcessBizContactsEditPage);
router.get('/bizcontacts-edit/:id', AuthGuard, DisplayBizContactsEditPage);
router.get('/bizcontacts-delete/:id', AuthGuard, ProcessBizContactsDelete);

export default router;