import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Human",
    website: "",
    profilePicture: "",
    followers: [],
    following: [],
  },
  {
    _id: uuid(),
    firstName: "Manasa",
    lastName: "Mandalreddy",
    username: "manasamandalreddy",
    password: "Manasa@1",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Let's connect",
    website: "",
    profilePicture: "",
    followers: [],
    following: [],
  },
];
