import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
    selector: 'password-strength-bar',
    templateUrl: './password-strength-bar.component.html',
    styleUrls: ['./password-strength-bar.component.scss']
})
export class PasswordStrengthBarComponent implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    @Input() showText: boolean;
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;
    strengthText: string;
    textStyle: string;
    private colors = ['#F00', '#F90', '#FF0', '#9a0', '#0F0'];

    private static measureStrength(p) {
        let _force = 0;
        const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

        const _lowerLetters = /[a-z]+/.test(p);
        const _upperLetters = /[A-Z]+/.test(p);
        const _numbers = /[0-9]+/.test(p);
        const _symbols = _regex.test(p);

        const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        let _passedMatches = 0;
        for (const _flag of _flags) {
            _passedMatches += _flag === true ? 1 : 0;
        }

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

        return _force;

    }

    private getColor(s) {
        let idx = 0;
        if (s <= 10) {
            idx = 0;
        } else if (s <= 20) {
            idx = 1;
        } else if (s <= 30) {
            idx = 2;
        } else if (s <= 40) {
            idx = 3;
        } else {
            idx = 4;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        const password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        const strength = PasswordStrengthBarComponent.measureStrength(password);
        if (password) {
            this.setStrength(strength);
            const c = this.getColor(strength);
            this.setBarColors(c.idx, c.col);
        }
    }

    private setBarColors(count, col) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    }

    private setStrength(s: number) {

        const st = ['null', 'Very weak', 'Weak', 'Medium', 'Strong', 'Stronger'];
        this.textStyle = this.getColor(s).col;
        if (s <= 10) {
            this.strengthText = st[1];
        } else if (s <= 20) {
            this.strengthText = st[2];
        } else if (s <= 30) {
            this.strengthText = st[3];
        } else if (s <= 40) {
            this.strengthText = st[4];
        } else {
            this.strengthText = st[5];
        }
    }

}
