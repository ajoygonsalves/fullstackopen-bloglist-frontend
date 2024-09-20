import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlogPost from "./CreateBlogPost";
import { vi } from "vitest";
import { NotificationProvider } from "../contexts/NotificationContext";
import { createBlogPost } from "../services/blogs";

// Mock the createBlogPost function
vi.mock("../services/blogs", () => ({
  createBlogPost: vi.fn(),
  updateLikes: vi.fn(),
}));

// Mock the useNotification hook
vi.mock("../contexts/NotificationContext", async () => {
  const actual = await vi.importActual("../contexts/NotificationContext");
  return {
    ...actual,
    useNotification: () => ({
      showNotification: vi.fn(),
    }),
  };
});

test("renders blog title and author, but not URL or likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "John Doe",
    url: "https://testblog.com",
    likes: 5,
    user: { username: "testuser" },
  };

  const user = { username: "testuser" };

  render(<Blog blog={blog} user={user} fetchBlogs={() => {}} />);

  // Check if title and author are rendered
  expect(screen.getByText("Test Blog")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();

  // Check if URL and likes are not rendered
  expect(screen.queryByText("https://testblog.com")).not.toBeInTheDocument();
  expect(screen.queryByText("likes: 5")).not.toBeInTheDocument();

  // Check if the details are hidden
  const detailsElement = screen.queryByText("https://testblog.com");
  expect(detailsElement).not.toBeInTheDocument();
});

test("blog URL and number of likes are shown when the view button is clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "John Doe",
    url: "https://testblog.com",
    likes: 5,
    user: { username: "testuser" },
  };

  const user = { username: "testuser" };

  render(<Blog blog={blog} user={user} fetchBlogs={() => {}} />);

  const userInteract = userEvent.setup();
  const button = screen.getByText("view");
  await userInteract.click(button);

  // Check if URL and likes are now visible
  expect(screen.getByText("https://testblog.com")).toBeInTheDocument();
  expect(screen.getByText("likes: 5")).toBeInTheDocument();
});

test("if like button is clicked twice, event handler is called twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "John Doe",
    url: "https://testblog.com",
    likes: 5,
    user: { username: "testuser" },
  };

  const user = {
    username: "testuser",
    token: "fake-token", // Add a fake token
  };
  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={user} fetchBlogs={mockHandler} />);

  const userInteract = userEvent.setup();

  // First, click the view button to show the blog details
  const viewButton = screen.getByText("view");
  await userInteract.click(viewButton);

  //   expect(screen.getByText("like")).toBeInTheDocument();

  // Now find and click the like button twice
  const likeButton = screen.getByText("like");
  await userInteract.click(likeButton);
  await userInteract.click(likeButton);

  console.log(mockHandler.mock.calls);

  // Check if the event handler was called twice
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("CreateBlogPost calls event handler with correct details when new blog is created", async () => {
  const mockFetchBlogs = vi.fn();
  const user = { username: "testuser" };
  const userInteract = userEvent.setup();

  render(
    <NotificationProvider>
      <CreateBlogPost user={user} fetchBlogs={mockFetchBlogs} />
    </NotificationProvider>
  );

  // Click the "Create new blog post" button to show the form
  const createButton = screen.getByText("Create new blog post");
  await userInteract.click(createButton);

  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const urlInput = screen.getByLabelText("URL:");
  const submitButton = screen.getByText("Create");

  await userInteract.type(titleInput, "Test Blog Title");
  await userInteract.type(authorInput, "Test Author");
  await userInteract.type(urlInput, "http://testblog.com");

  await userInteract.click(submitButton);

  expect(createBlogPost).toHaveBeenCalledTimes(1);
  expect(createBlogPost).toHaveBeenCalledWith({
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testblog.com",
    user: user,
  });

  expect(mockFetchBlogs).toHaveBeenCalledTimes(1);
});
