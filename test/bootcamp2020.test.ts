import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Bootcamp2020 from '../lib/bootcamp2020-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Bootcamp2020.Bootcamp2020Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
