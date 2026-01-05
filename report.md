# GitHub Repository

The repository contains an automated testing project developed for our selected website using the **Playwright** framework. The repository includes the test automation setup, Page Object Model structure, and implemented test cases covering smoke and functional scenarios. It also provides the necessary configuration files and instructions required to run the tests and review the test results.

**Link to repository:**  
https://github.com/hzijad/SE302-OLX-Testing-Project

---

# Test Case Documentation

This section contains a structured overview of all implemented test cases for the selected website. The documentation includes a total of **10 functional test cases** and **5 smoke test cases**, each presented in a table format.

Every test case table provides:
- Test case name  
- Test description  
- Preconditions  
- Steps to reproduce  
- Expected result  
- Actual result  

This ensures clarity, consistency, and full traceability of the testing process.

---

## Functional Tests

### Table 1: Functional Test Case (Positive)

| Field | Description |
|------|------------|
| **Test case name** | Search with Empty Query |
| **Test description** | Verifying system behavior when the user performs a search without entering any search keyword. |
| **Preconditions** | 1. User has access to the OLX.ba website.<br>2. User is on the homepage of the website.<br>3. User may be logged in or not logged in. |
| **Steps to reproduce** | 1. The user navigates to https://olx.ba/.<br>2. The user leaves the search input field empty.<br>3. The user clicks on the Search button. |
| **Expected result** | The system redirects the user to the search results page and displays all available listings without applying any search filters. |
| **Actual result** | The page reloads and the URL changes to https://olx.ba/pretraga?q=. A search results page is displayed showing a large number of mixed listings. The behavior is identical for logged-in and non-logged-in users. |

---

### Table 2: Functional Test Case (Negative)

| Field | Description |
|------|------------|
| **Test case name** | Registration with Missing Email Field |
| **Test description** | Verifying that the system prevents user registration when the email field is left empty and the phone number is not provided. |
| **Preconditions** | 1. User has access to the OLX.ba website.<br>2. User is on the registration page. |
| **Steps to reproduce** | 1. The user navigates to https://olx.ba/.<br>2. The user clicks on Registracija button.<br>3. The user fills in all required fields except the Email field.<br>4. The user enters a valid password that meets the required criteria.<br>5. The user clicks on the Register button. |
| **Expected result** | The system does not allow registration and displays a validation message indicating that the email or phone number field is required. The registration form remains on the same page. |
| **Actual result** | The system prevents registration and highlights the email field in red. A validation message is displayed stating that the email field is required when the phone number is not present. The filled fields remain unchanged and the user stays on the registration page. |

---

### Table 3: Functional Test Case (Positive)

| Field | Description |
|------|------------|
| **Test case name** | Verify Category Navigation and Breadcrumb Consistency |
| **Test description** | Validate that the app correctly maps UI category clicks to the correct URL parameters and updates breadcrumb navigation. |
| **Preconditions** | 1. User has access to the OLX.ba website.<br>2. User is on the home page. |
| **Steps to reproduce** | 1. The user navigates to https://olx.ba/.<br>2. The user clicks on the “Kategorije” (Categories) menu.<br>3. The user selects “Kompjuteri” (Computers).<br>4. The user selects the subcategory “Laptopi” (Laptops).<br>5. The user selects a specific brand filter (ex: “Apple”). |
| **Expected result** | The URL should contain `/kompjuteri/laptopi`. The breadcrumb trail must display: `Početna > Kompjuteri > Laptopi`. The search result header must display “Apple”. |
| **Actual result** | The category results page loaded and the URL opened with category_id=39. The results header was visible. The Apple filter was not consistently available. |

---

### Table 4: Functional Test Case (Negative)

| Field | Description |
|------|------------|
| **Test case name** | Verify Search Price Filter with Logically Invalid Range |
| **Test description** | Validate the system’s resilience against illogical user input with the filtering component. |
| **Preconditions** | 1. User has access to the OLX.ba website.<br>2. User is on the search results page (ex: https://olx.ba/pretraga?kanon=iphone). |
| **Steps to reproduce** | 1. The user navigates to https://olx.ba/.<br>2. The user locates the price filter.<br>3. The user types “50000” in the “Od” (from) input field.<br>4. The user types “10000” in the “Do” (Max) input field.<br>5. The user presses “Osvejži rezultate” (Refresh results) button next to the inputs. |
| **Expected result** | The system should display an error/validation message or reset the fields. It must not attempt to fetch results where this range (min > max) is true. |
| **Actual result** | The results page displayed an empty state message stating that there were no results for the query. |

---

## Smoke Tests

### Table 1: Smoke Test Case

| Field | Description |
|------|------------|
| **Test case name** | Homepage Loads Successfully |
| **Test description** | Verifying that the OLX.ba homepage loads correctly and displays the main interface elements without errors. |
| **Preconditions** | 1. User has access to the internet.<br>2. User has a web browser installed. |
| **Steps to reproduce** | 1. The user opens a new browser tab.<br>2. The user navigates to https://olx.ba/. |
| **Expected result** | The homepage loads successfully and displays the main interface elements such as the search bar, login/registration option, and navigation links without any errors. |
| **Actual result** | The homepage loaded successfully in a new browser tab and displayed the search bar, registration option, and main navigation elements without any errors. |

---

### Table 2: Smoke Test Case

| Field | Description |
|------|------------|
| **Test case name** | Listing Details Page Loads Successfully |
| **Test description** | Verifying that a listing details page loads correctly and displays the main listing information without errors. |
| **Preconditions** | 1. User has access to the internet.<br>2. User has a web browser installed. |
| **Steps to reproduce** | 1. The user navigates to https://olx.ba/.<br>2. The user enters a common keyword (e.g., telefon) in the search bar and submits.<br>3. The user opens the first listing from the results. |
| **Expected result** | The listing details page loads successfully and shows the listing title, price, and seller/contact section without any errors. |
| **Actual result** | The listing details page loaded successfully and displayed the listing title, price, and seller/contact section without any errors. |
