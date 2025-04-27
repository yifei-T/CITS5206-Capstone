import pandas as pd
import json

# Load specific sheets only (by index: 5 and 6, since index starts at 0)
excel_file = 'contact_list_sorted.xlsx'

# Load sheet 6 and 7, and skip the first row (header is on second row, which is index 1)
# sheet 6 is about the Academic Staff while sheet 7 is about Research Fellows/Adjunct Profressor
# I asigned the No. as the primary key which in string format with a or r indicates the table
sheets_to_load = {
    'Academic Staff': pd.read_excel(excel_file, sheet_name=5, header=1),
    'Research Fellows/Adjunct Professor': pd.read_excel(excel_file, sheet_name=6, header=1)
}

# Convert to JSON and count records
combined_data = {}

# Set a placeholder for NaN or blank values
placeholder_value = "N/A"

for sheet_name, df in sheets_to_load.items():
    # Replace NaN values or blank values with the placeholder
    df = df.fillna(placeholder_value)

    if 'Ext No' in df.columns:
        df['Ext No'] = df['Ext No'].apply(lambda x: int(x) if isinstance(x, (float, int)) and not pd.isna(x) else placeholder_value)
    
    # Convert to dictionary and add to combined data
    records = df.to_dict(orient='records')
    combined_data[sheet_name] = records
    print(f"{sheet_name}: {len(records)} records transferred.")

# Save to one JSON file
output_file = 'contact_list.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=4)

print(f"Data from Sheet 6 and 7 saved to '{output_file}'")