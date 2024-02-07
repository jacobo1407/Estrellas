package estrellas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import estrellas.model.Bookings;
import estrellas.model.Rooms;
import estrellas.model.Users;
import estrellas.repository.BookingsRepository;
import estrellas.repository.RoomsRepository;
import estrellas.repository.UsersRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class Controller {
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private RoomsRepository roomsRepository;

	@Autowired
	private BookingsRepository bookingsRepository;

	@PostMapping("ESTRELLAS/register")
	ResponseEntity<Object> register(@RequestBody Users newUser) {
		try {
			newUser.setIdUser(getNextUserId());
			usersRepository.save(newUser);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}

	}

	@PostMapping("/ESTRELLAS/login")
	ResponseEntity<Object> login(@RequestBody Users user) {
		try {
			Optional<Users> authorized = usersRepository.findByUserAndPassword(user.getEmail(), user.getPassword());

			if (authorized.isPresent()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/ESTRELLAS/userInformation")
	ResponseEntity<Object> userInformation(@RequestParam(value = "id") String userId) {
		try {
			List<Users> user = usersRepository.findById(Integer.parseInt(userId));
			if (!user.isEmpty()) {
				String name = user.get(0).getName();
				String surname = user.get(0).getSurname();
				String email = user.get(0).getEmail();
				String userJson = "{";
				userJson += "\n\t\"name\": \"" + name + "\",";
				userJson += "\n\t\"surname\": \"" + surname + "\",";
				userJson += "\n\t\"email\": \"" + email + "\"";
				userJson += "\n}";
				return ResponseEntity.ok(userJson);
			} else {
				return ResponseEntity.notFound().header("Content-Length", "0").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/ESTRELLAS/roomInformation")
	ResponseEntity<Object> roomInformation(@RequestParam(value = "id") String roomId) {
		try {
			boolean isFirstImage = true;
			List<Rooms> room = roomsRepository.findById(Integer.parseInt(roomId));
			if (!room.isEmpty()) {
				int idRoom = room.get(0).getIdRoom();
				int peopleNumber = room.get(0).getPeopleNumber();
				String title = room.get(0).getTitle();
				String description = room.get(0).getDescription();
				String[] images = room.get(0).getImages();
				String roomJson = "{";
				roomJson += "\n\t\"idRoom\": \"" + idRoom + "\",";
				roomJson += "\n\t\"title\": \"" + title + "\",";
				roomJson += "\n\t\"description\": \"" + description + "\"";
				roomJson += "\n\t\"peopleNumber\": \"" + peopleNumber + "\",";
				roomJson += "\n\t\"images\": [\n";
				for (String image : images) {
					if (!isFirstImage) {
						roomJson += ",\n";
					} else {
						isFirstImage = false;
					}
					roomJson += "\t\"" + image + "\"";
				}
				roomJson += "\n\t]";
				roomJson += "\n}";
				return ResponseEntity.ok(roomJson);
			} else {
				return ResponseEntity.notFound().header("Content-Length", "0").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@PostMapping("ESTRELLAS/bookRoom")
	ResponseEntity<Object> bookRoom(@RequestBody Bookings newBook) {
		try {
			newBook.setIdBook(getNextBookId());
			bookingsRepository.save(newBook);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/ESTRELLAS/userBookedRooms")
	ResponseEntity<Object> userBookedRooms(@RequestParam(value = "id") String userId) {
		try {
			boolean isFirstImage = true;
			List<Bookings> userBookings = bookingsRepository.findRoomsByIdUser(Integer.parseInt(userId));

			if (!userBookings.isEmpty()) {
				Integer idRoom;
				Date entranceDate;
				Date exitDate;
				List<Integer> bookedIdRooms = new ArrayList<Integer>();
				List<Date> bookedDatesRooms = new ArrayList<Date>();

				for (int i = 0; i < userBookings.size(); i++) {
					idRoom = userBookings.get(i).getIdRoom();
					entranceDate = userBookings.get(i).getEntranceDate();
					exitDate = userBookings.get(i).getExitDate();

					bookedIdRooms.add(idRoom);
					bookedDatesRooms.add(entranceDate);
					bookedDatesRooms.add(exitDate);
				}

				List<Rooms> bookedRooms;
				String userBookedRoomsJson = "[";
				for (int i = 0; i < bookedIdRooms.size(); i++) {
					bookedRooms = roomsRepository.findById(bookedIdRooms.get(i));

					idRoom = bookedRooms.get(0).getIdRoom();
					String title = bookedRooms.get(0).getTitle();
					String description = bookedRooms.get(0).getDescription();
					Integer peopleNumber = bookedRooms.get(0).getPeopleNumber();
					String[] images = bookedRooms.get(0).getImages();

					entranceDate = bookedDatesRooms.get(i);
					exitDate = bookedDatesRooms.get(i + 1);

					userBookedRoomsJson += "\n\t{";
					userBookedRoomsJson += "\n\t\t\"idRoom\": \"" + idRoom + "\",";
					userBookedRoomsJson += "\n\t\t\"title\": \"" + title + "\",";
					userBookedRoomsJson += "\n\t\t\"description\": \"" + description + "\",";
					userBookedRoomsJson += "\n\t\t\"peopleNumber\": \"" + peopleNumber + "\",";
					userBookedRoomsJson += "\n\t\"images\": [\n";
					for (String image : images) {
						if (!isFirstImage) {
							userBookedRoomsJson += ",\n";
						} else {
							isFirstImage = false;
						}
						userBookedRoomsJson += "\t\"" + image + "\"";
					}
					userBookedRoomsJson += "\n\t],";

					userBookedRoomsJson += "\n\t\t\"entranceDate\": \"" + entranceDate + "\",";
					userBookedRoomsJson += "\n\t\t\"exitDate\": \"" + exitDate + "\",";
					userBookedRoomsJson += "\n\t},";
				}

				userBookedRoomsJson = userBookedRoomsJson.substring(0, userBookedRoomsJson.length() - 1);
				userBookedRoomsJson += "\n]";

				return ResponseEntity.ok(userBookedRoomsJson);
			} else {
				return ResponseEntity.notFound().header("Content-Length", "0").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	// URL ejemplo:
	// http://localhost:8080/ESTRELLAS/filterRooms?entranceDate=2022-03-19&exitDate=2022-03-24&peopleNumber=2
	@GetMapping("/ESTRELLAS/filterRooms")
	ResponseEntity<String> filterRooms(
			@RequestParam(value = "entranceDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date entranceDate,
			@RequestParam(value = "exitDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date exitDate,
			@RequestParam(value = "peopleNumber") Integer peopleNumber) {
		try {
			List<Rooms> filteredRooms = new ArrayList<>();
			List<Bookings> filteredBookings = new ArrayList<>();

			// Filtrar parametro fecha de entrada. Si esta entre las fechas indicadas la
			// fecha de entrada.
			List<Bookings> filteredEntranceBookings = bookingsRepository
					.findByEntranceDateLessThanAndExitDateGreaterThan(entranceDate, entranceDate);

			// Filtrar por fecha de salida. Si esta entre las fechas indicadas la fecha de
			// salida.
			List<Bookings> filteredExitBookings = bookingsRepository
					.findByEntranceDateLessThanAndExitDateGreaterThan(exitDate, exitDate);
			filteredBookings.addAll(filteredEntranceBookings);
			filteredBookings.addAll(filteredExitBookings);

			// Filtrar por número de personas
			filteredRooms = roomsRepository.findByPeopleNumber(peopleNumber);
			for (Rooms room : filteredRooms) {
				for (Bookings book : filteredBookings) {
					if (book.getIdRoom() == room.getIdRoom()) {
						filteredRooms.remove(room);
					}
				}
			}

			StringBuilder jsonFinally = new StringBuilder("[");
			boolean isFirstRoom = true;
			boolean isFirstImage = true;
			if (!filteredRooms.isEmpty()) {
				for (Rooms room : filteredRooms) {
					String title = room.getTitle();
					String description = room.getDescription();
					int peopleNum = room.getPeopleNumber();
					int idRoom = room.getIdRoom();
					String[] images = room.getImages();
					if (!isFirstRoom) {
						jsonFinally.append(",");
					} else {
						isFirstRoom = false;
					}

					jsonFinally.append("{");
					jsonFinally.append("\"idRoom\":").append(idRoom).append(",");
					jsonFinally.append("\"title\":").append(title).append(",");
					jsonFinally.append("\"description\":").append(description).append(",");
					jsonFinally.append("\"peopleNumber\":").append(peopleNum).append(",");
					jsonFinally.append("\"images\": [");
					for (String image : images) {
						if (!isFirstImage) {
							jsonFinally.append(",");
						} else {
							isFirstImage = false;
						}
						jsonFinally.append("\"" + image + "\"");
					}
					jsonFinally.append("]");
					jsonFinally.append("}");
				}

				jsonFinally.append("]");
				if (!isFirstRoom) {
					System.out.println(jsonFinally);
					return ResponseEntity.ok(jsonFinally.toString());
				} else {
					return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
				}
			} else {
				return ResponseEntity.notFound().header("Content-Length", "0").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	private int getNextUserId() {
		Integer maxUserId = usersRepository.findTopByOrderByIdUserDesc().map(Users::getIdUser).orElse(0);
		return maxUserId + 1;
	}

	private int getNextBookId() {
		Integer maxBookId = bookingsRepository.findTopByOrderByIdRoomDesc().map(Bookings::getIdRoom).orElse(0);
		return maxBookId + 1;
	}

}
