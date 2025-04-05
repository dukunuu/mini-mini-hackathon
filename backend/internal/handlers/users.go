package handlers

import (
	"encoding/json"
	"go-react-template/backend/internal/db"
	"go-react-template/backend/pkg/sqlcqueries"
	"net/http"
	// "golang.org/x/crypto/bcrypt" // Recommended for hashing passwords on the backend
)

type UserHandler struct {
	dbService *db.DBService
}

func NewUserHandler(dbService *db.DBService) *UserHandler {
	return &UserHandler{dbService: dbService}
}

// POST /api/v1/users
func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var params sqlcqueries.CreateUserParams
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()

	// Basic validation (add more as needed, e.g., email format)
	if params.Email == "" || params.PasswordHash == "" {
		// SECURITY WARNING: Receiving PasswordHash directly from the client is insecure.
		// The backend should receive the plain password and hash it here.
		// Example using bcrypt (uncomment import and below):
		// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(plainPasswordFromRequest), bcrypt.DefaultCost)
		// if err != nil {
		//    respondWithError(w, http.StatusInternalServerError, "Failed to hash password")
		//    return
		// }
		// params.PasswordHash = string(hashedPassword)
		respondWithError(w, http.StatusBadRequest, "Invalid input: email and password hash required")
		return
	}

	// TODO: Add logic to hash the password securely on the backend if not already done.
	// For now, assuming PasswordHash is provided directly as per sqlcqueries.

	user, err := h.dbService.CreateUser(r.Context(), params)
	if err != nil {
		code, msg := mapDBError(err) // Use existing error mapping
		respondWithError(w, code, msg)
		return
	}

	// Consider what information to return. Avoid sending the hash back.
	// Maybe return a subset of user fields or just a success message.
	// For now, returning the user object as created by sqlc (excluding hash).
	userResponse := map[string]interface{}{
		"user_id":    user.UserID,
		"email":      user.Email,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
	}

	respondWithJSON(w, http.StatusCreated, userResponse)
}
