package estrellas.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

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

@RestController
public class Controller {
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private RoomsRepository roomsRepository;

	@Autowired
	private BookingsRepository bookingsRepository;

	// Registro de un usuario
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

	// Login de un usuario
	@PostMapping("/ESTRELLAS/login")
	ResponseEntity<Object> login(@RequestBody Users user) {
		try {
			Optional<Users> authorized = usersRepository.findByUserAndPassword(user.getEmail(), user.getPassword());

			if (authorized.isPresent()) {
				return ResponseEntity.ok("si");
			} else {
				return ResponseEntity.ok("no");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	// Información de un usuario
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

	// Información de una habitación
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
				Double price = room.get(0).getPrice();
				String[] images = room.get(0).getImages();
				String roomJson = "{";
				roomJson += "\n\t\"idRoom\": \"" + idRoom + "\",";
				roomJson += "\n\t\"title\": \"" + title + "\",";
				roomJson += "\n\t\"description\": \"" + description + "\"";
				roomJson += "\n\t\"peopleNumber\": \"" + peopleNumber + "\",";
				roomJson += "\n\t\"price\": \"" + price + "\",";
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

	// Filtros
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
					Double price = room.getPrice();
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
					jsonFinally.append("\"price\":").append(price).append(",");
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

	// Guardar una reserva nueva
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
					Double price = bookedRooms.get(0).getPrice();
					String[] images = bookedRooms.get(0).getImages();
					entranceDate = bookedDatesRooms.get(i);
					exitDate = bookedDatesRooms.get(i + 1);
					userBookedRoomsJson += "\n\t{";
					userBookedRoomsJson += "\n\t\t\"idRoom\": \"" + idRoom + "\",";
					userBookedRoomsJson += "\n\t\t\"title\": \"" + title + "\",";
					userBookedRoomsJson += "\n\t\t\"description\": \"" + description + "\",";
					userBookedRoomsJson += "\n\t\t\"peopleNumber\": \"" + peopleNumber + "\",";
					userBookedRoomsJson += "\n\t\t\"price\": \"" + price + "\",";
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

//	Se utiliza para obtener el usuario con el idUser máximo, y orElse(0) se utiliza para manejar el caso 
//	en que no haya usuarios en la base de datos. Luego, se suma 1 al valor máximo para obtener el próximo idUser.
	private int getNextUserId() {
		Integer maxUserId = usersRepository.findTopByOrderByIdUserDesc().map(Users::getIdUser).orElse(0);
		return maxUserId + 1;
	}

	private int getNextBookId() {
		Integer maxBookId = bookingsRepository.findTopByOrderByIdRoomDesc().map(Bookings::getIdRoom).orElse(0);
		return maxBookId + 1;
	}


	@PostMapping("/ESTRELLAS/emailConfirmation")
    ResponseEntity<Object> handleEmailConfirmation(@RequestBody String email_desti) {
        try {
            envieMail(email_desti);
			return ResponseEntity.ok("Email enviado correctamente");
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
			return ResponseEntity.internalServerError().build();
        }
    }
	
	public static String generateCode() {
		String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		char randomLetter = letters.charAt(new Random().nextInt(letters.length()));

		int randomNum1 = 100 + new Random().nextInt(900);
		int randomNum2 = 100 + new Random().nextInt(900);

		String code = randomLetter + String.valueOf(randomNum1) + randomLetter + String.valueOf(randomNum2);

		return code;
	}
	
	public static void envieMail(String email_desti) throws UnsupportedEncodingException, MessagingException {
		String code = generateCode();
		String missatge = "Hola " + email_desti + "! \nTu código de verificación es: " + code;
		String host_email = "SMTP.GMAIL.COM";
		String port_email = "587";
		String assumpte = "Confirmación de correo";
		String email_remitent = "cuatroestrellassoporte@gmail.com";
		String email_remitent_pass = "soporteEstrellas4";
		
		Properties props = System.getProperties();
		props.put("mail.smtp.host", host_email);
		props.put("mail.smtp.user", email_remitent);
		props.put("mail.smtp.clave", email_remitent_pass);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", port_email);
		Session session = Session.getDefaultInstance(props);

		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(email_remitent));
		message.addRecipients(Message.RecipientType.TO, email_desti);
		message.setSubject(assumpte);

		Multipart multipart = new MimeMultipart();

		BodyPart messageBodyPart1 = new MimeBodyPart();
		messageBodyPart1.setText(missatge);

		multipart.addBodyPart(messageBodyPart1);

		message.setContent(multipart);

		Transport transport = session.getTransport("smtp");
		transport.connect(host_email, email_remitent, email_remitent_pass);
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}

}
