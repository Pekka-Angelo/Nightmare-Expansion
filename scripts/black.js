const blackAlt = newEffect(10, e => {
	Draw.color(Color.white, Pal.lancerLaser, e.fin());
	
	Drawf.tri(e.x, e.y, 20 * e.fout(), (140 + 50), e.rotation);
	Drawf.tri(e.x, e.y, 20 * e.fout(), 10, e.rotation + 180);
	Draw.reset();
});

const blackBullet = extend(BasicBulletType, {
	update: function(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.rayLength, false);
		};
	},
	
	draw: function(b){
		Draw.color(Color.white, Pal.lancerLaser, b.fin());
		
		for(var i = 0; i < 7; i++){
			Tmp.v1.trns(b.rot(), i * 8);
			var sl = Mathf.clamp(b.fout() - 0.5) * (80 - i * 10);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rot() + 90);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rot() - 90);
		}
		Drawf.tri(b.x, b.y, 20 * b.fout(), (this.rayLength + 30), b.rot());
		Drawf.tri(b.x, b.y, 20 * b.fout(), 10, b.rot() + 180);
		Draw.reset();
	}
});

blackBullet.speed = 0.01;
blackBullet.damage = 155;
blackBullet.lifetime = 13;
blackBullet.collidesTeam = false;
blackBullet.pierce = true;
blackBullet.rayLength = 140 + 35;
blackBullet.hitEffect = Fx.hitLancer;
blackBullet.despawnEffect = Fx.none;
blackBullet.shootEffect = blackAlt;
blackBullet.smokeEffect = Fx.lightningShoot;

const black = extendContent(ItemTurret, "black", {});

black.shootShake = 4;
black.recoil = 5;
black.shots = 3;
black.shootEffect = Fx.lightningShoot;
black.ammo(Items.graphite, blackBullet);