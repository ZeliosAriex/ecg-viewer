# ECG Visualizer 📈❤️

## 📘 Overview

ECG Visualizer is an advanced visualization tool designed for the depiction and analysis of electrocardiograms (ECG). It leverages the power of modern web technologies to handle and parse even very large CSV files efficiently through the use of workers, enabling smooth and responsive user experiences.

## 🛠 Features

- **High Performance:** Handles large CSV files efficiently using web workers.
- **Responsive Visualization:** Offers smooth and interactive graphs for detailed analysis.
- **Advanced Parsing:** Quickly parses CSV files and renders ECG data accurately.
- **User-friendly Interface:** Easy-to-use, intuitive user interface for hassle-free navigation.

## Technologies Used

- React 18
- Zustand 4 with Immer (for state management)
- MUI 5 (Material)
- Victory (for Graphs)
- Papaparse 5
- Web Workers

## 🚀 Quick Setup

1. **Clone the repository and navigate to the project directory:**
2. **Install the Dependencies**

```sh
pnpm install
```

3. **Build the Project**

```sh
pnpm run build
```

4. **Run the Project 🚀**

```sh
pnpm run preview
```

5. Run the Tests 🧪

```sh
pnpm test
```

## 📁 Data Configuration

Inside the `public/data` folder, you can place your txt files with tabular data (CSV). The project is configured to read a specific file from this location, as specified in `src/config`:

```javascript
export const FILE_DATA_PATH = '/data/ecg-data-partial.txt'
```

## 🔄 Changing the Data Source
If you want to visualize different data, you can change the `FILE_DATA_PATH` to the path of your chosen file. For example, if you have a file named `my-data.txt` in the `public/data` folder, you can modify the configuration like this:

```javascript
export const FILE_DATA_PATH = '/data/my-data.txt';
```
