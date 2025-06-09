import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Theme Functionality', () => {
  afterEach(() => {
    localStorage.clear();
    // Reset data-theme attribute on html element
    document.documentElement.removeAttribute('data-theme');
  });

  test('initial theme is light by default', () => {
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    // localStorage might be initially null or 'light' depending on App.js logic if it sets it on first load even if nothing is there
    const storedTheme = localStorage.getItem('theme');
    expect(storedTheme === 'light' || storedTheme === null).toBeTruthy();
  });

  test('toggles theme and updates localStorage', () => {
    render(<App />);
    const themeToggle = screen.getByTestId('theme-toggle');

    // Initial state should be light
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    // Toggle to dark
    fireEvent.click(themeToggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back to light
    fireEvent.click(themeToggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('loads theme from localStorage on initial render', () => {
    localStorage.setItem('theme', 'dark');
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  test('loads light theme if invalid value is in localStorage', () => {
    localStorage.setItem('theme', 'invalid-theme');
    render(<App />);
    // App.js defaults to 'light' if localStorage theme is not 'dark'
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light'); // App.js should correct it
  });
});

// Basic test to ensure App renders without crashing (from original create-react-app)
test('renders app without crashing', () => {
  render(<App />);
  // You might want to check for a more specific element if "learn react" is removed
  // For example, check if Navbar is rendered
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

describe('Navbar Mobile Menu Functionality', () => {
  // Helper function to simulate a smaller viewport
  const setMobileViewport = () => {
    // This is a common way to simulate viewport changes, but it might not trigger all CSS media query effects in JSDOM.
    // For more complex scenarios, you might need visual regression tests or more sophisticated environment setup.
    // However, for class toggling, this should be sufficient.
    global.innerWidth = 767; // One pixel less than 768px breakpoint
    global.dispatchEvent(new Event('resize'));
  };

  const setDesktopViewport = () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  };

  beforeEach(() => {
    // Default to mobile viewport for these tests, can be overridden in specific tests
    setMobileViewport();
  });

  afterEach(() => {
    // Reset viewport to a default desktop size after tests
    setDesktopViewport();
  });

  test('toggles mobile menu visibility on hamburger click', () => {
    render(<App />);
    const hamburgerMenu = screen.getByTestId('hamburger-menu');
    const navList = screen.getByTestId('nav-list');

    // Initially, on mobile, nav-list should not have 'show' class (or be hidden)
    // Note: JSDOM doesn't fully support layout/visibility checks like `toBeVisible()`.
    // We check for the class that controls visibility.
    expect(navList).not.toHaveClass('show');

    // Click to open menu
    fireEvent.click(hamburgerMenu);
    expect(navList).toHaveClass('show');

    // Click to close menu
    fireEvent.click(hamburgerMenu);
    expect(navList).not.toHaveClass('show');
  });

  test('hamburger menu should be present on mobile, nav-list hidden initially', () => {
    setMobileViewport(); // Ensure mobile
    render(<App />);
    // Hamburger should be "visible" (rendered)
    // Nav-list should be "hidden" (rendered but styled to be not visible, by not having 'show' class)
    expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
    expect(screen.getByTestId('nav-list')).not.toHaveClass('show');
  });

  // Optional: Test that on desktop, nav-list is visible and hamburger might be hidden by CSS
  // This test is more about CSS behavior, which JSDOM doesn't fully emulate for visibility.
  // We can check if the hamburger menu loses its specific 'display: flex' from mobile CSS.
  // And nav-list does not gain 'show' but is visible by default flex properties.
  test('on desktop, nav-list is typically visible and hamburger is not actively displayed by flex', () => {
    setDesktopViewport(); // Switch to desktop
    render(<App />);

    const hamburgerMenu = screen.getByTestId('hamburger-menu');
    const navList = screen.getByTestId('nav-list');

    // On desktop, nav-list should be visible by default CSS (not relying on 'show' class)
    // It also should not have the 'show' class which is for mobile scenarios
    expect(navList).not.toHaveClass('show');

    // Hamburger menu is always in the DOM, its visibility is controlled by CSS (display: none on desktop)
    // We can't directly test CSS's display:none in JSDOM easily.
    // However, we can check it does not have inline style 'display: flex' which mobile adds.
    // Or, more simply, ensure it's in the document.
    expect(hamburgerMenu).toBeInTheDocument();
  });
});
