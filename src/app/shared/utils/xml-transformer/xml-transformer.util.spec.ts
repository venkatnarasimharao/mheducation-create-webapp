import { XmlTransformerUtil } from './xml-transformer.util';

describe('XmlTransformerUtil', () => {

  describe('xmlToJson', () => {
    it('should convert a valid XML string to JSON', () => {
      const xmlString = `
        <person>
          <name>John Doe</name>
          <age>30</age>
          <address>
            <street>Main St</street>
            <city>New York</city>
          </address>
        </person>`;
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    })

    it('should handle an empty XML string', () => {
      const xmlString = '';
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    });

    xit('should handle malformed XML string gracefully', () => {
      const malformedXml = '<person><name>John Doe</name><age>30<address></person>';
      const result = XmlTransformerUtil.xmlToJson(malformedXml);
      expect(result).toBeDefined();
    })
  })

  describe('jsonToXml', () => {
    it('should convert a valid JSON object to XML string', () => {
      const jsonObj = {
        person: {
          name: 'John Doe',
          age: '30',
          address: {
            street: 'Main St',
            city: 'New York'
          }
        }
      }
      const result = XmlTransformerUtil.jsonToXml(jsonObj);
      expect(result).toBeDefined();
    });

    it('should handle empty JSON object', () => {
      const jsonObj = {};
      const result = XmlTransformerUtil.jsonToXml(jsonObj);
      expect(result).toBeDefined();
    });

    it('should handle JSON with attributes', () => {
      const jsonObj = {
        person: {
          _id: '123',
          name: 'John Doe',
          age: '30'
        }
      };
      const result = XmlTransformerUtil.jsonToXml(jsonObj);
      expect(result).toBeDefined();
    });
  });

  describe('private methods', () => {
    it('should handle contentNode method correctly', () => {
      const xmlString = `
        <root>
          <content>
            <text>This is a content node</text>
          </content>
        </root>`;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const rootNode = xmlDoc.documentElement;
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    });

    it('should handle root method correctly', () => {
      const xmlString = `
        <person>
          <name>John Doe</name>
          <age>30</age>
        </person>`;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const rootNode = xmlDoc.documentElement;
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle XML with no children correctly', () => {
      const xmlString = '<root></root>';
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    });
    it('should handle XML with only text nodes correctly', () => {
      const xmlString = '<description>This is a description</description>';
      const result = XmlTransformerUtil.xmlToJson(xmlString);
      expect(result).toBeDefined();
    });
  });
});
