import { OK } from "../constants/http";
import SessionModel from "../Models/SessionModel";
import catchErrors from "../utils/catchErrors";

export const getSessionHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
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
      ...(session.id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});
