/** @format */

export const chatQuery = {
  select: {
    id: true,
    name: true,
    type: true,
    participants: {
      select: {
        name: true,
        email: true,
        image: true,
        id: true,
      },
    },
    messages: {
      select: {
        id: true,
        message: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dateTime: "desc",
      },
      take: 1,
    },
  },
} as const;

export const messageQuery = {
  select: {
    id: true,
    message: true,
    user: {
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
      },
    },
    dateTime: true,
  },
} as const;
