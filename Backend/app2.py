import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
import time
import re

job_title = sys.argv[1]
job_location = sys.argv[2]



# Set up Chrome options to run in headless mode
# chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument("--window-size=1920,1080")
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--disable-dev-shm-usage")

# Initialize the Chrome WebDriver with the headless option
driver = webdriver.Chrome()

# Navigate to the page containing the salary information
driver.get('https://www.indeed.com/career/salaries')

# Locate the job role input field and location input field
job_role = driver.find_element(By.ID, 'input-title-autocomplete')
location = driver.find_element(By.ID, 'input-location-autocomplete')

# Locate the submit button
send_button = driver.find_element(By.ID, 'title-location-search-btn')

# Clear location input
clear_button_location = driver.find_elements(By.ID, 'clear-location-localized')
if clear_button_location:
    clear_button_location[0].click()
    time.sleep(1)  

# Clear job title input 
clear_button_title = driver.find_elements(By.ID, 'clear-title-localized')
if clear_button_title:
    clear_button_title[0].click()
    time.sleep(1) 

# Enter the job role and location
job_role.send_keys(job_title)
location.send_keys(job_location)

# Click the search button
send_button.click()
time.sleep(5)

# Select 'Per year' in the pay period dropdown
# select = Select(driver.find_element(By.ID, 'pay-period-selector'))
# select.select_by_visible_text('Per year')

time.sleep(1)

# Get the average and high salary values
salary = driver.find_element(By.CLASS_NAME, 'css-hy3rce').text

# Extract the high salary using XPath
salary_high_element = driver.find_element(By.XPATH, "//div[contains(@class, 'css-12dzqpd')]//div[contains(@class, 'css-u74ql7') and span[contains(text(), 'High')]]")
salary_high = salary_high_element.text

# Remove everything except numbers using regex
salary = re.sub("[^0-9]", "", salary)
salary_high = re.sub("[^0-9]", "", salary_high)

# Print the results
print(f"{salary},{salary_high}")

# Close the browser
driver.quit()
