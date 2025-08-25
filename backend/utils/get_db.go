package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

func GetDatabaseDir(appName string) (string, error) {
	var baseDir string
	
	switch runtime.GOOS {
	case "windows":
		appData := os.Getenv("APPDATA")
		if appData == "" {
			return "", fmt.Errorf("no se pudo obtener la variable APPDATA en Windows")
		}
		baseDir = filepath.Join(appData, appName)
		
	case "linux":
		if os.Getuid() == 0 {
			baseDir = filepath.Join("/var/lib", appName)
		} else {
			homeDir, err := os.UserHomeDir()
			if err != nil {
				return "", fmt.Errorf("no se pudo obtener el directorio home: %v", err)
			}
			baseDir = filepath.Join(homeDir, ".local", "share", appName)
		}
		
	case "darwin":
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return "", fmt.Errorf("no se pudo obtener el directorio home: %v", err)
		}
		baseDir = filepath.Join(homeDir, "Library", "Application Support", appName)
		
	default:
		return "", fmt.Errorf("sistema operativo no soportado: %s", runtime.GOOS)
	}
	
	return baseDir, nil
}

func EnsureDatabaseDir(appName string) (string, error) {
	dbDir, err := GetDatabaseDir(appName)
	if err != nil {
		return "", err
	}
	
	if _, err := os.Stat(dbDir); os.IsNotExist(err) {
		// Crear el directorio con permisos apropiados
		err := os.MkdirAll(dbDir, 0755)
		if err != nil {
			return "", fmt.Errorf("no se pudo crear el directorio %s: %v", dbDir, err)
		}
		fmt.Printf("Directorio creado: %s\n", dbDir)
	} else if err != nil {
		return "", fmt.Errorf("error al verificar el directorio %s: %v", dbDir, err)
	} else {
		fmt.Printf("Directorio ya existe: %s\n", dbDir)
	}
	
	return dbDir, nil
}

func GetDatabasePath(appName, dbFileName string) (string, error) {
	dbDir, err := EnsureDatabaseDir(appName)
	if err != nil {
		return "", err
	}
	
	return filepath.Join(dbDir, dbFileName), nil
}