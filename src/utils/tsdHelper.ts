/**
﻿ *******************************************************
﻿ *                                                     *
﻿ *   Copyright (C) Microsoft. All rights reserved.     *
﻿ *                                                     *
﻿ *******************************************************
﻿ */

import * as path from 'path';
import * as Q from 'q';
import * as tsd from 'tsd';

export class TsdHelper {
   /**
    *   Helper to install typings using tsd (TypeScript Definition Manager).
    *   {tsdJsonPath} - the path to the tsd.json
    *   {queryStrings} - the name-pattern query strings for type definition files to be installed
    */
    public static installTypings(tsdJsonPath: string, queryStrings: string[]): void {
        let tsdApi = tsd.getAPI(tsdJsonPath);
        let query: tsd.Query;
        let options: tsd.Options;

        tsdApi.readConfig(true).then(() => {
            let opts: tsd.Options = new tsd.Options();

            let query = new tsd.Query();

            // Add each of the name pattern strings passed as a
            // string array parameter to the query
            queryStrings.forEach((namePattern: string) => {
                query.addNamePattern(namePattern);
            });

            query.versionMatcher = new tsd.VersionMatcher("latest");

            return tsdApi.select(query, opts).then((selection: tsd.Selection) => {
                return tsdApi.install(selection, opts);
            });
    	}).catch((err: Error): void => {
            // Catch all possible errors
            console.log(err);
        });
    }
}