package sqlite

import (
	"log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"POS/backend/database/models"
)

var DB *gorm.DB

func Init() {
	var err error

	DB, err = gorm.Open(sqlite.Open("POSGYM.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectar con SQLite:", err)
	}

	log.Println("Base de datos SQLite conectada")

	err = autoMigrate()
	if err != nil {
		log.Fatal("Error en migraciones:", err)
	}

	log.Println("Migraciones aplicadas")
}

func autoMigrate() error {	
	return DB.AutoMigrate(
		&models.Client{},
		&models.Product{},
		&models.Sale{},
		&models.SalesDetail{},
		&models.Membership{},
		&models.Subscription{},
		&models.ActivityLog{},
	)
}
