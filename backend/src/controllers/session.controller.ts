import { OK } from "../constants/http";
import SessionModel from "../Models/SessionModel";
import catchErrors from "../utils/catchErrors";
import { Response } from "express";

export const getSessionHandler = catchErrors(async (req: any, res: Response) => {
  const userId = req.userId;
  const sessionId = req.sessionId;
  
  const sessions = await SessionModel.find(
    {
      userId,
      expiresAt: { $gt: Date.now() },
    },
    { 
      _id: 1,
      userAgent: 1,
      createdAt: 1,
      expiresAt: 1,
    }
  );

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === sessionId && {
        isCurrent: true,
      }),
    }))
  );
});
