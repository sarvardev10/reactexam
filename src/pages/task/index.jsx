import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Card as MuiCard,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Card = ({ title, cards, setCards }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      status: selectedStatus,
    };
    setCards([...cards, newCard]);
    setOpenModal(false);
    setNewCardTitle("");
    setSelectedStatus("");
  };

  const handleEditCard = () => {
    const updatedCards = cards.map((card) => {
      if (card.id === editCardId) {
        return { ...card, title: newCardTitle, status: selectedStatus };
      }
      return card;
    });
    setCards(updatedCards);
    setOpenModal(false);
    setEditMode(false);
    setEditCardId(null);
    setNewCardTitle("");
    setSelectedStatus("");
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const handleEditButtonClick = (id, title, status) => {
    setOpenModal(true);
    setEditMode(true);
    setEditCardId(id);
    setNewCardTitle(title);
    setSelectedStatus(status);
  };

  return (
    <div style={{ width: "100%", maxWidth: "300px", margin: "10px" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <div>
        {cards
          .filter((card) => card.status === title.toLowerCase())
          .map((card, index) => (
            <MuiCard
              key={card.id}
              variant="outlined"
              style={{
                marginBottom: "10px",
                backgroundColor: "#f0f0f0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {card.title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Status: {card.status}
                  </Typography>
                  <div>
                    <IconButton
                      onClick={() =>
                        handleEditButtonClick(card.id, card.title, card.status)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCard(card.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </MuiCard>
          ))}
      </div>
      <Button
        onClick={() => {
          setOpenModal(true);
          setEditMode(false);
          setSelectedStatus(title.toLowerCase());
        }}
        variant="contained"
        startIcon={<AddIcon />}
        style={{
          backgroundColor: "#4caf50",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        Add Card
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            minWidth: "300px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2>{editMode ? "Edit Card" : "Add New Card"}</h2>
          <TextField
            label="Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            select
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {["Open", "Pending", "In Progress", "Complete"].map((option) => (
              <MenuItem key={option} value={option.toLowerCase()}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={editMode ? handleEditCard : handleAddCard}
            variant="contained"
            color="primary"
            style={{
              marginTop: "20px",
              backgroundColor: "#4caf50",
              color: "#fff",
            }}
          >
            {editMode ? "Save Changes" : "Add"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Task Board</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {["Open", "Pending", "In Progress", "Complete"].map((title, index) => (
          <Card key={index} title={title} cards={cards} setCards={setCards} />
        ))}
      </div>
    </div>
  );
};

export default App;
