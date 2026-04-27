# DarkMap
Brief: ML satellite mapping tool using NASA VIIRS nighttime light data to detect unelectrified villages in Kampong Speu, Cambodia.


### THE PROBLEM
Millions of people in rural Cambodia live without electricity. Without electricity, there are no refrigerated medicines, no clinic lighting, no clean water pumps. NGOs cannot help communities they cannot find, and many unelectrified villages are invisible in official databases.

### OUR SOLUTION
DarkMap uses real NASA VIIRS nighttime satellite data to automatically detect dark zones in Kampong Speu province, Cambodia, identifying settlements that likely have no electricity. The tool outputs an interactive map that any NGO can use to target energy access and health interventions.

### SDG CONNECTION
Electrification is a direct determinant of health outcomes, SDG 3. No electricity means no refrigerated vaccines, no powered medical equipment, no safe lighting for emergency care. Identifying unelectrified communities is step one of fixing this.



# HOW TO RUN
- Go to https://colab.research.google.com
- Click GitHub tab
- Paste the repository URL
- Select the notebook file
- Run the notebook
- Click Connect (top right)

Run cells:
Press Shift + Enter, or
Click Runtime → Run all



### Tech Stack
- Data: NASA VIIRS VNP46A2
- Processing: Python, h5py, rasterio, numpy
- Visualization: Folium
- ML: ResNet50 CNN
- API: FastAPI
