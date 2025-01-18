export const USER_SEARCH_CONFIG = {
    "search": {
        "start": "1",
        "query": "",
        "textTypes": {
            "textType": "all"
        },
        "textNamespace": "",
        "textConstraints": {
            "textConstraint": [
                "-globalEdition:true",
                "-rightsRevoked:true"
            ]
        },
        "sortfield": {
            "_name": "Relevance",
            "_id": "",
            "_direction": "descending"
        },
        "facets": {
            "facet": [
                {
                    "item": [
                        {
                            "_label": "Instructor Only",
                            "_value": "true",
                            "_selected": "false"
                        },
                        {
                            "_label": "Student Content",
                            "_value": "false",
                            "_selected": "true"
                        }
                    ],
                    "_label": "Audience",
                    "_element": "instructorOnly",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "2",
                    "_doCount": "false",
                    "_optimizeFullFacet": "false",
                    "_facetType": "value-list",
                    "_displayType": "none"
                },
                {
                    "item": [
                        {
                            "_label": "Books",
                            "_value": "Book",
                            "_selected": "true",
                            "_selectIfNothingElseSelected": "true"
                        },
                        {
                            "_label": "Digital Products",
                            "_value": "OnlineMedia",
                            "_selected": "false"
                        },
                        {
                            "_label": "Cases",
                            "_value": "Case",
                            "_selected": "false"
                        },
                        {
                            "_label": "Labs",
                            "_value": "Lab",
                            "_selected": "false"
                        },
                        {
                            "_label": "Articles",
                            "_value": "Article",
                            "_selected": "false"
                        },
                        {
                            "_label": "Readings",
                            "_value": "Reading",
                            "_selected": "false"
                        },
                        {
                            "_label": "Images (Cartoons...)",
                            "_value": "Cartoon",
                            "_selected": "false"
                        },
                        {
                            "_label": "Video",
                            "_value": "video",
                            "_selected": "false"
                        },
                        {
                            "_label": "ExpressBooks",
                            "_value": "PreBuiltBook",
                            "_selected": "false"
                        },
                        {
                            "_label": "Uploads",
                            "_value": "Upload",
                            "_selected": "false"
                        },
                        {
                            "_label": "Specialty Content",
                            "_value": "SpecialtyContentBook",
                            "_selected": "false"
                        },
                        {
                            "_value": "Collection",
                            "_label": "Books",
                            "_selected": "true",
                            "_selectIfNothingElseSelected": "true"
                        }
                    ],
                    "_label": "Content Type",
                    "_element": "specialtyContentType",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "5",
                    "_doCount": "true",
                    "_facetType": "value-list",
                    "_displayType": "tabs",
                    "_optimizeFullFacet": "false",
                    "_autoExpand": "true",
                    "_requiresSelection": "true"
                },
                {
                    "item": {
                        "_label": "Available as eBook",
                        "_value": "Y",
                        "_selected": "false"
                    },
                    "_label": "Format",
                    "_element": "erights",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "1",
                    "_doCount": "true",
                    "_facetType": "value-list",
                    "_optimizeFullFacet": "false"
                },
                {
                    "item": [
                        {
                            "_label": "2025",
                            "_selected": "false",
                            "_value": "2025-2025"
                        },
                        {
                            "_label": "2024",
                            "_selected": "false",
                            "_value": "2024-2024"
                        },
                        {
                            "_label": "2023",
                            "_selected": "false",
                            "_value": "2023-2023"
                        },
                        {
                            "_label": "2022",
                            "_selected": "false",
                            "_value": "2022-2022"
                        },
                        {
                            "_label": "2021",
                            "_selected": "false",
                            "_value": "2021-2021"
                        },
                        {
                            "_label": "2020",
                            "_selected": "false",
                            "_value": "2020-2020"
                        },
                        {
                            "_label": "2019",
                            "_selected": "false",
                            "_value": "2019-2019"
                        },
                        {
                            "_label": "2018",
                            "_selected": "false",
                            "_value": "2018-2018"
                        },
                        {
                            "_label": "2017",
                            "_selected": "false",
                            "_value": "2017-2017"
                        },
                        {
                            "_label": "2016",
                            "_selected": "false",
                            "_value": "2016-2016"
                        },
                        {
                            "_label": "2015",
                            "_selected": "false",
                            "_value": "2015-2015"
                        },
                        {
                            "_label": "2014",
                            "_selected": "false",
                            "_value": "2014-2014"
                        },
                        {
                            "_label": "2013",
                            "_selected": "false",
                            "_value": "2013-2013"
                        },
                        {
                            "_label": "2012",
                            "_selected": "false",
                            "_value": "2012-2012"
                        },
                        {
                            "_label": "Prior to 2012",
                            "_selected": "false",
                            "_value": "1900-2011"
                        }
                    ],
                    "_label": "Copyright Year",
                    "_element": "year",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "11",
                    "_doCount": "true",
                    "_facetType": "range-list",
                    "_allItem": "true"
                },
                {
                    "item": [
                        {
                            "_label": "English",
                            "_value": "English",
                            "_selected": "false"
                        },
                        {
                            "_label": "Italian",
                            "_value": "Italian",
                            "_selected": "false"
                        },
                        {
                            "_label": "Spanish",
                            "_value": "Spanish",
                            "_selected": "false"
                        },
                        {
                            "_label": "Arabic",
                            "_value": "Arabic",
                            "_selected": "false"
                        },
                        {
                            "_label": "Basque",
                            "_value": "Basque",
                            "_selected": "false"
                        },
                        {
                            "_label": "Simplified Chinese",
                            "_value": "SimplifiedChinese",
                            "_selected": "false"
                        },
                        {
                            "_label": "Traditional Chinese",
                            "_value": "TraditionalChinese",
                            "_selected": "false"
                        },
                        {
                            "_label": "French",
                            "_value": "French",
                            "_selected": "false"
                        },
                        {
                            "_label": "German",
                            "_value": "German",
                            "_selected": "false"
                        },
                        {
                            "_label": "Greek",
                            "_value": "Greek",
                            "_selected": "false"
                        },
                        {
                            "_label": "Japanese",
                            "_value": "Japanese",
                            "_selected": "false"
                        },
                        {
                            "_label": "Portuguese",
                            "_value": "Portuguese",
                            "_selected": "false"
                        },
                        {
                            "_label": "Russian",
                            "_value": "Russian",
                            "_selected": "false"
                        },
                        {
                            "_label": "Turkish",
                            "_value": "Turkish",
                            "_selected": "false"
                        }
                    ],
                    "_label": "Language",
                    "_element": "language",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "14",
                    "_doCount": "true",
                    "_facetType": "value-list"
                },
                {
                    "item": [
                        {
                            "_label": "8.5 x 11 inches",
                            "_value": "8by11",
                            "_selected": "true"
                        },
                        {
                            "_label": "6 x 9 inches",
                            "_value": "6by9",
                            "_selected": "false"
                        }
                    ],
                    "_label": "Trim Size",
                    "_element": "trimSize",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_rows": "2",
                    "_doCount": "true",
                    "_facetType": "value-list",
                    "_displayType": "list",
                    "_autoExpand": "false"
                },
                {
                    "_label": "topicId",
                    "_element": "topicId",
                    "_namespace": "http://mhhe.com/primis/meta/resolved",
                    "_doCount": "true",
                    "_doFilter": "false",
                    "_optimizeFullFacet": "false",
                    "_doRestrictValues": "true"
                }
            ]
        }
    }
}

export const BOOK_COVER_IMAGES = {
    "request": {
        "usertype": "external",
        "audience": "HE",
        "cover-guids": {
            "cover-guid": [
                "238A2DCF-90A5-BC17-6E53-CFC1E99AFFBF",
                "B7A8BF07-6D08-0ADA-7AFC-58E103FB5913"
            ]
        },
        "disciplines": {
            "disciplineId": "0e5448a9-798d-4253-8f28-396a266231f0"
        },
        "trimsize": "8by11",
        "locale": "en_US",
        "display": "true"
    }
}
export const search_inside_config = {
    "search": {
        "token": "",
        "guid": "",
        "query": "",
        "elements": "meta,content"
    }
}

export const COLLECTION_CODES = [
    { code: "mlp_logo_1", name: "MACNEIL LEHRER Production", image: "assets/images_wide/mlp_logo.png", category: "Media" },
    { code: "US_HIS_1", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_ivey.png", category: "History" },
    { code: "AP_LABS_1", name: "A & P LABS", image: "assets/images_wide/SR_aplabs.png", category: "Science" },
    { code: "CN_COLL_1", name: "CANADIAN CASE COLLECTION", image: "assets/images_wide/SR_cancase.png", category: "Business" },
    { code: "DR_PUB_1", name: "DARDEN BUSINESS", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_1", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "US_HIS_2", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_american_his_doc.png", category: "History" },
    { code: "DR_PUB_2", name: "DARDEN BUSINESS PUBLISHING", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_2", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "mlp_logo_2", name: "MACNEIL LEHRER Production", image: "assets/images_wide/mlp_logo.png", category: "Media" },
    { code: "US_HIS_3", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_ivey.png", category: "History" },
    { code: "AP_LABS_2", name: "A & P LABS", image: "assets/images_wide/SR_aplabs.png", category: "Science" },
    { code: "CN_COLL_2", name: "CANADIAN CASE COLLECTION", image: "assets/images_wide/SR_cancase.png", category: "Business" },
    { code: "DR_PUB_3", name: "DARDEN BUSINESS", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_3", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "US_HIS_4", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_american_his_doc.png", category: "History" },
    { code: "DR_PUB_4", name: "DARDEN BUSINESS PUBLISHING", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_4", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "mlp_logo_3", name: "MACNEIL LEHRER Production", image: "assets/images_wide/mlp_logo.png", category: "Media" },
    { code: "US_HIS_5", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_ivey.png", category: "History" },
    { code: "AP_LABS_3", name: "A & P LABS", image: "assets/images_wide/SR_aplabs.png", category: "Science" },
    { code: "CN_COLL_3", name: "CANADIAN CASE COLLECTION", image: "assets/images_wide/SR_cancase.png", category: "Business" },
    { code: "DR_PUB_5", name: "DARDEN BUSINESS", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_5", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "US_HIS_6", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_american_his_doc.png", category: "History" },
    { code: "DR_PUB_6", name: "DARDEN BUSINESS PUBLISHING", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_6", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "mlp_logo_4", name: "MACNEIL LEHRER Production", image: "assets/images_wide/mlp_logo.png", category: "Media" },
    { code: "US_HIS_7", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_ivey.png", category: "History" },
    { code: "AP_LABS_4", name: "A & P LABS", image: "assets/images_wide/SR_aplabs.png", category: "Science" },
    { code: "CN_COLL_4", name: "CANADIAN CASE COLLECTION", image: "assets/images_wide/SR_cancase.png", category: "Business" },
    { code: "DR_PUB_7", name: "DARDEN BUSINESS", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_7", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" },
    { code: "US_HIS_8", name: "AMERICAN HISTORY", image: "assets/images_wide/SR_american_his_doc.png", category: "History" },
    { code: "DR_PUB_8", name: "DARDEN BUSINESS PUBLISHING", image: "assets/images_wide/SR_darden.png", category: "Business" },
    { code: "CS_COLL_8", name: "CASE CENTER COLLECTIONS", image: "assets/images_wide/SR_ecch.png", category: "Business" }
];

