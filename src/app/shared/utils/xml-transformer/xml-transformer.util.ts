export class XmlTransformerUtil {

    /**
    * Helper function to process content node and return a string value
    * @param node content node in the XML
    * @returns {string} Node's content as a string
    */
    private static contentNode(node: Node): string {
        let nodeString = '';
        let cnType: number;
        if (node.hasChildNodes()) {
            for (let nodeIndex = 0; nodeIndex < node.childNodes.length; nodeIndex++) {
                cnType = node.childNodes[nodeIndex].nodeType;
                if (!(cnType === 3 || cnType === 8)) {
                    if (node.childNodes[nodeIndex].nodeType === 1) {
                        nodeString += (new XMLSerializer()).serializeToString(node.childNodes[nodeIndex]);
                    } else {
                        nodeString += node.childNodes[nodeIndex].nodeValue;
                    }
                }
            }
        }
        nodeString = nodeString.replace(/\s{2,}/g, ' ').replace(/\t/g, ' ');
        // nodeString = encodeURI(nodeString);
        return nodeString;
    }

    /**
     * Recursive function to process each node and create a JSON object
     * @param node the node in the XML to be processed
     * @returns {object} A JSON object representing the XML structure
     */
    private static root(node: any): any {
        let nodeObject: any = {};
        let nodeText = '';
        const nodeName = node.nodeName;
        const nodeType = node.nodeType;

        if (!(nodeType === 3 || nodeType === 8)) {
            if (node.attributes && node.attributes.length > 0) {
                nodeObject['@attributes'] = {};
                for (let index = 0; index < node.attributes.length; index++) {
                    const attributeName = node.attributes[index].nodeName;
                    const attributeValue = node.attributes[index].nodeValue;
                    nodeObject['@attributes'][attributeName] = attributeValue;
                }
            }

            if (nodeName === 'content') {
                nodeObject = this.contentNode(node);
            } else {
                if (node.hasChildNodes()) {
                    for (let index = 0; index < node.childNodes.length; index++) {
                        const childNode = node.childNodes[index];
                        const childName = childNode.nodeName;
                        const childType = childNode.nodeType;

                        if (!(childType === 3 || childType === 8)) {
                            if (nodeObject[childName] === undefined) {
                                nodeObject[childName] = this.root(childNode);
                            } else {
                                if (!(nodeObject[childName] instanceof Array)) {
                                    const oldNode = nodeObject[childName];
                                    nodeObject[childName] = [];
                                    nodeObject[childName].push(oldNode);
                                }
                                nodeObject[childName].push(this.root(childNode));
                            }
                        } else {
                            // Handle text nodes
                            if (childType === 3) {
                                if (nodeName === 'description' && nodeObject === undefined) {
                                    nodeObject = '';
                                }
                                nodeText = childNode.nodeValue.replace(/\s{2,}/g, ' ').replace(/\t/g, ' ').replace(/\n/g, ' ');
                                if (!(nodeText === "" || nodeText === " ")) {
                                    if (nodeName !== 'description') {
                                        nodeObject = nodeText;
                                    } else {
                                        nodeObject += nodeText;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return nodeObject;
    }

    /**
     * Convert from XML to JSON
     * @param xmlString the XML string to be converted to JSON
     * @returns {object} the resulting JSON object
     */
    public static xmlToJson(xmlString: string): any {
        const parser = new DOMParser();
        let xmlDoc: Document;
        try {
            xmlDoc = parser.parseFromString(xmlString, 'application/xml');
            const rootNode = xmlDoc.documentElement;
            return this.root(rootNode);
        } catch (e) {
            console.error('Error parsing XML:', e);
            return null;
        }
    }

    public static jsonToXml(jsonObj: any): string {
        const buildXml = (obj: any, nodeName: string): string => {
            let xml = '';

            if (typeof obj === 'object' && !Array.isArray(obj)) {
                xml += `<${nodeName}>`;
                const startWith = Object.keys(obj).some((ele: any) => ele.startsWith('_'))
                if (startWith) {
                    xml = xml.replace(`<${nodeName}>`, `<${nodeName}`);
                }
                const objEntries = Object.entries(obj)
                let objEntriesIndex = 1;
                for (const [key, value] of objEntries) {
                    if (key.startsWith('_')) {
                        if (objEntries?.length === objEntriesIndex) {
                            xml += ` ${key.substring(1)}="${value}">`;
                        } else {
                            xml += ` ${key.substring(1)}="${value}"`;
                        }
                    }
                    objEntriesIndex++;
                }
                for (const [key, value] of Object.entries(obj)) {
                    if (!key.startsWith('_')) {
                        xml += buildXml(value, key);
                    }
                }

                xml += `</${nodeName}>`;
            } else if (Array.isArray(obj)) {
                obj.forEach((item) => {
                    xml += buildXml(item, nodeName);
                });
            } else {
                xml += `<${nodeName}>${obj}</${nodeName}>`;
            }

            return xml;
        };
        const rootKey = Object.keys(jsonObj)[0];
        return buildXml(jsonObj[rootKey], rootKey);
    }
}
