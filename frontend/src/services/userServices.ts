import { axiosInstance } from "./apiServices";

export const registerUser = async (formData:{
  username: string,
  email: string,
  password: string
}) => {
  try {
    
    const response = await axiosInstance.post("/users/register", {
      username:formData.username,
      email:formData.email,
      password:formData.password,
    });
    if (response && response.data && response.data.data) {
      console.log("User Successfull created");
      console.log(response.data.data);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An Unexpected Error Occured");
    }
  }
};
export const loginUser = async (formData:{
  email: string,
  password: string
}) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email:formData.email,
      password:formData.password,
    });
    if (response && response.data && response.data.data) {
      console.log("User Successfull created");
      console.log(response.data.data);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An Unexpected Error Occured");
    }
  }
};

export const checkUserExists = async (field: string, value: string) => {
  try {
    const response = await axiosInstance.post("/users/check-user", { field, value });
    // console.log(JSON.stringify(response.data));
    return response.data.success;
  } catch (err) {
    console.error("Error checking user existence:", err);
    return false;
  }
};
