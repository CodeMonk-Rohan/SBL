import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.File;
import java.util.Scanner;

public class UserDom {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Enter User ID: ");
            int userId = scanner.nextInt();

            File inputFile = new File("users.xml");
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser saxParser = factory.newSAXParser();

            DefaultHandler handler = new DefaultHandler() {
                boolean bId = false;
                boolean bName = false;
                boolean bEmail = false;
                boolean bAge = false;
                boolean bCity = false;
                int id = 0;

                public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
                    if (qName.equalsIgnoreCase("id")) {
                        bId = true;
                    } else if (qName.equalsIgnoreCase("name")) {
                        bName = true;
                    } else if (qName.equalsIgnoreCase("email")) {
                        bEmail = true;
                    } else if (qName.equalsIgnoreCase("age")) {
                        bAge = true;
                    } else if (qName.equalsIgnoreCase("city")) {
                        bCity = true;
                    }
                }

                public void characters(char[] ch, int start, int length) throws SAXException {
                    if (bId) {
                        id = Integer.parseInt(new String(ch, start, length));
                        bId = false;
                    } else if (bName && id == userId) {
                        System.out.println("User Details:");
                        System.out.println("ID: " + id);
                        System.out.println("Name: " + new String(ch, start, length));
                        bName = false;
                    } else if (bEmail && id == userId) {
                        System.out.println("Email: " + new String(ch, start, length));
                        bEmail = false;
                    } else if (bAge && id == userId) {
                        System.out.println("Age: " + new String(ch, start, length));
                        bAge = false;
                    } else if (bCity && id == userId) {
                        System.out.println("City: " + new String(ch, start, length));
                        bCity = false;
                    }
                }
            };

            saxParser.parse(inputFile, handler);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
